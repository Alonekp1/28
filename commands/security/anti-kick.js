const fs = require("fs");
const Discord = require("discord.js");
const { Color } = require("../../config.js");

module.exports = {
  name: "antikick",
  aliases: ["anti-kick"],
  description: "Prevent others from mass kicking your members",
  usage: ["e!antikick [number/on/off]"],
  category: ["Security"],
  enabled: true,			
  memberPermissions: [ "SEND_MESSAGES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: false,			
  guilOwnerOnly: true,
  cooldown: 3000,
  run: async (bot, message, args) => {
    
    let guild = await Guild.findOne({ guildID: message.guild.id });
     let num = args[1];
    if (args[1] === "on") {
      guild.kick.onoff = "on";
      guild.kick.user = message.author.tag
      guild.save();
       const embed = new Discord.MessageEmbed()
        .setColor(Color)
        .setDescription(`<:emoji_4:946456817268043877> The **AntiKick** system is enabled correctly!`);
      return message.channel.send(embed);
     } else if (args[1] === "off") {
         guild.kick.onoff = "off";
         guild.save();
       const embed1 = new Discord.MessageEmbed()
        .setColor(Color)
        .setDescription(`<:emoji_5:946456833810370710> The **AntiKick** system is disabled correctly!`);
      return message.channel.send(embed1);
    }
    if (isNaN(num) || parseInt(num) < 1){
      const embed2 = new Discord.MessageEmbed()
        .setColor(Color)
        .setDescription(`error syntax <:emoji_5:946456833810370710>\n ${guild.prefix}antikick [on,off,<number>]`
        );
      return message.channel.send(embed2);
    }
    guild.kick.user = message.author.tag
    guild.kick.lmite = num;
    guild.save()
    const embed3 = new Discord.MessageEmbed()
      .setColor(Color)
      .setDescription(`Successfully antikick changed to **${guild.kick.lmite}**
`);
    return message.channel.send(embed3);
  }
};
