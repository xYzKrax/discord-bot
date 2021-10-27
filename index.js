//-- Vérification Console --//

console.log("Console OK !");

const Discord = require("discord.js");
const { cp } = require("fs");
const { METHODS } = require("http");
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGES
    ]
});



 //-- Prefix --//

const prefix = ".";


  //-- Verification Bot --//

Client.on("ready", () => {
    console.log("Bot OK !");
});

           //-- Commande .Clear --//

Client.on("messageCreate", message => {
    if(message.member.permissions.has("MANAGE_MESSAGES")){
        if(message.content.startsWith(prefix + "clear")){
            let args = message.content.split(" ");
            
            if(args[1] == undefined){
                message.reply("Nombre de message non inclut.");
            }
            else {
                let number = parseInt(args[1]);

                if(isNaN(number)){
                    message.reply("Nombre de message incorrect.");
                }
                else {
                    message.channel.bulkDelete(number).then(messages => {
                        console.log("Suppresion de " + messages.size + " messages réussi !");
                    }).catch(err => {
                        console.log("Erreur de clear:" + err);

                    
                    });
                }
            }
        }
    }
})

 //-- Ban/mute/unmute/tempmute --//

Client.on("messageCreate", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if(message.member.permissions.has("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre mal mentionné.");
            
            }
            else{
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " à été banni avec succés.");
               
                }
                else {
                    message.reply("Imposible de bannir ce membre.");
                }
            }
        }
        else if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();

            if (mention == undefined){
                message.reply("Membre mal mentionné.");
            }
            else {
                if(mention.kickable){
                    mention.kick();
                    message.channel.send(mention.displayName + " à été kick avec succés.");
                }
                else {
                    message.reply("Impossible de kick ce membre.");
                }
            }
        }
        else if(message.content.startsWith(prefix + "mute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre mal mentionné.");
            }
            else {
                mention.roles.add("903033887280750613");
                mention.roles.remove("903040995644567562");
                message.reply(mention.displayName + " mute avec succés.");
            }
        }
        else if(message.content.startsWith(prefix + "unmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre mal mentionné.");
            }
            else {
                mention.roles.add("903040995644567562");
                mention.roles.remove("903033887280750613");
                message.reply(mention.displayName + " unmute avec succés.");
            }
        }
        else if(message.content.startsWith(prefix + "tempmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre mal mentionné.");

            }
            else {
                let args = message.content.split(" ");

                mention.roles.add("903033887280750613");
                mention.roles.remove("903040995644567562");
                setTimeout(function(){
                    mention.roles.add("903040995644567562");
                mention.roles.remove("903033887280750613");
                    message.channel.send("<@" + mention.id + "> tu peux désoromais parler de nouveaux.");

                }, args [2] * 1000);
            }
        }
    }
});























                           //-- Token Bot --//
Client.login("process.env.TOKEN");