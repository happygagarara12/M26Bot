const Discord = require("discord.js");
const fetch = require("node-fetch");
const querystring = require("querystring");
const { stripIndents } = require("common-tags");
const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...` : str;
const client = new Discord.Client();
const chooseArr = ["🗻", "📰", "✂"];

var date = new Date();

const Commands = new Discord.MessageEmbed()
.setColor("#0074ff")
.setTitle("**Commands List:**")
.setDescription(`**(Public Commands:)** \n \n **${process.env.prefix}help** \n - Get list of commands \n \n **${process.env.prefix}timetable** \n - Get the timetable \n \n **${process.env.prefix}urban <things to search>** \n - Search things using urban dicionary \n \n **${process.env.prefix}rps** \n - Play Rock Paper Scissors with the bot \n \n **${process.env.prefix}lovemeter <@user1> <@user2>** \n - Calculates the love affinity user1 have for user2, Baitory cannot use this because she is bad. \n \n **${process.env.prefix}clear <amount to clear>** \n - Clear the lastest message by amount \n \n **${process.env.prefix}whois <@user>** \n - Get information about the user \n \n **(Big Only Commands:)** \n \n **${process.env.prefix}killdynasty** \n - Kill Dynasty Bot \n \n **${process.env.prefix}revivedynasty** \n - Revive Dynasty Bot \n \n **${process.env.prefix}prefix <prefix to change>** \n - Change this Bot Prefix`)

client.once("ready", () => {
    console.log("M2/6 EP Special Bot is online!");
    client.user.setActivity(`${process.env.prefix}help`, { type: 'WATCHING' });
})

client.on("message", message =>{
    try{
        if(message.author.id === "732047974481395734"){
            if(process.env.NoDynasty === "true"){
                message.delete({ timeout: 0, reason: "nah" });
                return;
            } else {
                return;
            }
        }
        if(!message.content.toLowerCase().startsWith(process.env.prefix)) return;
        const args = message.content.slice(process.env.prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
        if(command === "help"){
            message.channel.send(Commands)
        } else if(command === "timetable"){
            message.channel.send(`${message.author.toString()} \n **Here!**`)
            message.channel.send({
                files: ["./images/timetable.jpg"]
            });
        } else if(command === "sendanswer"){
            if(message.author.id !== "420875438655537162"){
                message.channel.send("Only Big can use this command!");
                return;
            }
            client.channels.cache.get("756859432893284403").send("**Chapter 3:**");
            client.channels.cache.get("756859432893284403").send({
                files: ["./storage/Chapter 3.pdf"]
            });
            client.channels.cache.get("756859432893284403").send("**Chapter 4:**");
            client.channels.cache.get("756859432893284403").send({
                files: ["./storage/Chapter 4.pdf"]
            });
        } else if(command === "urban"){
            if (!args.length) {
                return message.channel.send("You need to supply a search term!");
            }
            const query = querystring.stringify({ term: args.join(" ") });
            async function run() {
                const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
                if (list.length === 0) {
                    return message.channel.send(`No results found for **${args.join(" ")}**`);
                }
                const [answer] = list;

                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(answer.word)
                    .setURL(answer.permalink)
                    .addField("Definition", trim(answer.definition, 2000))
                    .addField("Example", trim(answer.example, 2000))
                    .addField("Rating", `:thumbsup:: ${answer.thumbs_up} \n \n :thumbsdown:: ${answer.thumbs_down}`);
        
                message.channel.send(embed);
            }
            run();
        } else if(command === "chat"){
            if(message.author.id !== "420875438655537162"){
                message.channel.send("Only Big can use this command!");
                return;
            }
            if(message.channel.type === "dm"){
                if(message.author.username === "DOG CAT APPLE"){
                    if(!args){
                        return;
                    }
                    client.channels.cache.get("738334434809610332").send(args.join(" "))
                    return;
                }
            }
            if(message.author.username === "DOG CAT APPLE"){
                if(!args){
                    return;
                }
                message.delete({ timeout: 0, reason: "nah" });
                message.channel.send(args.join(" "))
                return;
            }
        } else if(command === "rps"){
            async function run() {
                const { promptMessage } = require("./functions.js");
                const embed = new Discord.MessageEmbed()
                .setColor("#ffffff")
                .setFooter(message.guild.me.displayName, client.user.displayAvatarURL)
                .setDescription("Add a reaction to one of these emojis to play the game!")
                .setTimestamp();
    
                const m = await message.channel.send(embed);
                const reacted = await promptMessage(m, message.author, 30, chooseArr);
    
                const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];
    
                const result = await getResult(reacted, botChoice);
                await m.reactions.removeAll();;
    
                embed
                    .setDescription("")
                    .addField(result, `${reacted} vs ${botChoice}`);
    
                m.edit(embed);
    
                function getResult(me, clientChosen) {
                    if ((me === "🗻" && clientChosen === "✂") ||
                        (me === "📰" && clientChosen === "🗻") ||
                        (me === "✂" && clientChosen === "📰")) {
                            return "You won!";
                    } else if (me === clientChosen) {
                        return "It's a tie!";
                    } else {
                        return "You lost!";
                    }
                }
            }
            run();
        } else if(command === "lovemeter"){
            if(!args[0]){
                message.channel.send("Please provide a user to use the command with!!")
                return;
            } else if(!args[1]){
                message.channel.send("Please provide another user to use the command with!")
                return;
            }
            if(message.author.id === "612651190257451019"){
                message.channel.send("Baitory no good baitory bad bad you cannot use this command haha you bad");
                return;
            }
            const love = Math.random() * 100;
            const loveIndex = Math.floor(love / 10);
            const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);
            const userArray =  message.mentions.members.array();
            const embed = new Discord.MessageEmbed()
                .setColor("#ffb6c1")
                .setDescription(`☁ ${userArray[0]} loves **${userArray[1]}** this much:`)
                .addField(`\n 💟 ${Math.floor(love)}% \n \n ${loveLevel}`);
    
            message.channel.send(embed);
        } else if(command === "clear"){
            if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
                return message.reply("Please provide an amout of message to delete!").then(m => m.delete(5000));
            }

            if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                return message.reply("Sorry I don't have manage message permission").then(m => m.delete(5000));
            }
    
            let deleteAmount = 1;
    
            if (parseInt(args[0]) >= 100) {
                deleteAmount += 99;
            } else {
                deleteAmount += parseInt(args[0]);
            }
    
            message.channel.bulkDelete(deleteAmount, true)
        } else if(command === "whois"){
            const { formatDate } = require("./functions.js");
            const member = message.mentions.members.first()
            const joined = formatDate(member.joinedAt);
            const roles = member.roles.cache
                .filter(r => r.id !== message.guild.id)
                .map(r => r).join(", ") || 'none';
            const created = formatDate(member.user.createdAt);
            const embed = new Discord.MessageEmbed()
                .setFooter(member.displayName, member.user.displayAvatarURL)
                .setThumbnail(member.user.displayAvatarURL)
                .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)
                .addField('Member information:', stripIndents`**- Display name:** ${member.displayName}
                **- Joined at:** ${joined}
                **- Roles:** ${roles}`, true)
                .addField('User information:', stripIndents`**- ID:** ${member.user.id}
                **- Username**: ${member.user.username}
                **- Tag**: ${member.user.tag}
                **- Created at**: ${created}`, true)
                .setTimestamp()
            if (member.user.presence.game) 
                embed.addField('Currently playing', stripIndents`** Name:** ${member.user.presence.game.name}`);
            message.channel.send(embed);
        } else if(command === "announce"){
            if(message.author.id !== "420875438655537162"){
                message.channel.send("Only Big can use this command!");
                return;
            }
            if(message.channel.type === "dm"){
                if(message.author.id === "420875438655537162"){
                    if(!args){
                        return;
                    }
                    client.channels.cache.get("742740323792584827").send("@everyone **Important!** \n \n " + args.join(" "));
                    return;
                }
            }
            if(message.author.id === "420875438655537162"){
                if(!args){
                    return;
                }
                message.delete({ timeout: 0, reason: "nah" });
                client.channels.cache.get("742740323792584827").send("@everyone **Important!** \n \n " + args.join(" "));
                return;
            }
        } else if(command === "revivedynasty"){
            if(message.author.id !== "420875438655537162"){
                message.channel.send("Only Big can use this command!");
                return;
            }
            if(process.env.NoDynasty === "true"){
                process.env.NoDynasty = "false";
                message.channel.send("Revived Dynasty!");
            } else {
                message.channel.send("Dynasty is not killed, you cannnot revive Dynasty!");
            }
        } else if(command === "killdynasty"){
            if(message.author.id !== "420875438655537162"){
                message.channel.send("Only Big can use this command!");
                return;
            }
            if(process.env.NoDynasty === "false"){
                process.env.NoDynasty = "true";
                message.channel.send("Killed Dynasty!");
            } else {
                message.channel.send("Dynasty is already killed!");
            }
        } else if(command === "prefix"){
            if(message.author.id !== "420875438655537162"){
                message.channel.send("Only Big can use this command!");
                return;
            }
            if(!args[0]){
                message.channel.send("Please provide a prefix to change");
                return;
            }
            if(process.env.prefix === args.join(" ")){
                message.channel.send("The prefix is already set to `" + args.join(" ") + "` ! Please choose a new prefix to change");
                return;
            }
            process.env.prefix = args.join(" ");
            message.channel.send("Successfully Changed the prefix! \n New Prefix - `" + process.env.prefix + "`");
            client.user.setActivity(`${process.env.prefix}help`, { type: 'WATCHING' });
        }
    }
    catch (err) {
        message.channel.send("**Error!**");
        message.channel.send("```" + err + "```");
    }
});

client.login(process.env.M26EPBotTOKEN);
