const Discord = require('discord.js-selfbot');
const express = require('express');
const app = express();
const TOKEN = process.env.TOKEN;
const client = new Discord.Client();
const config = require('./config.json');
const chalk = require('chalk')
const channelId = config.logId

app.get('/', (req,res) => {
    res.send("Just's Auto Reaction")
})
app.listen(3000)

client.on('ready', () => {
    console.log(`Logged With ${chalk.red.bold(client.user.tag)}`)
})

client.on('message', async message => {
    if (message.content.toLowerCase().includes('giveaway') || message.author.username.toLowerCase().includes('giveaway')) {
        setTimeout(() => {
            message.react('🎉').catch(() => {})
        }, 3000)
        const channel = client.channels.cache.get(`${channelId}`)
        const embed = new Discord.MessageEmbed()
            .setTitle('NEW GIVEAWAY')
            .setColor('RED')
            .setDescription('**Server Name:**\n${message.guild.name}\n**Server Id:**\n${message.guild.id}\n**Message:** [Jump To](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})')
            .setFooter(message.guild.id, message.guild.iconURL())
            .setThumbnail(message.author.avatarURL())

        message.channel.send(`**Server Name:**\n${message.guild.name}\n**Server Id:**\n${message.guild.id}\n**Message:** https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
    }
})

client.login(TOKEN)