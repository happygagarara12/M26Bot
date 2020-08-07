const Discord = require("discord.js");
const fetch = require("node-fetch");
const querystring = require("querystring");
const { stripIndents } = require("common-tags");
const randomPuppy = require("random-puppy");
const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...` : str;
const client = new Discord.Client();
const chooseArr = ["🗻", "📰", "✂"];
const prefix = ".";

var date = new Date();

const Help = new Discord.MessageEmbed()
.setColor("#0074ff")
.setTitle("**Recommended Apps:**")
.setDescription("**Microsoft Math \n - Solve math problems \n \n iOS - [Click here!](https://apps.apple.com/us/app/microsoft-math-solver-hw-app/id1483962204) \n Android - [Click here!](https://play.google.com/store/apps/details?id=com.microsoft.math&hl=en) \n Windows/Mac - [Click here!](https://math.microsoft.com/en/)**")

const Commands = new Discord.MessageEmbed()
.setColor("#0074ff")
.setTitle("**Commands List:**")
.setDescription(`**${prefix}help** \n - Get list of commands \n \n **${prefix}timetable** \n - Get the timetable \n \n **${prefix}homework** \n - Get list of homeworks \n \n **${prefix}urban <things to search>** \n - Search things using urban dicionary \n \n **${prefix}ping** \n - Get the bot latency (ping) \n \n **${prefix}rps** \n - Play Rock Paper Scissors with the bot \n \n **${prefix}lovemeter <@user1> <@user2>** \n - Calculates the love affinity user1 have for user2. \n \n **${prefix}clear <amount to clear>** \n - Clear the lastest message by amount \n \n **${prefix}meme** \n - Get a random meme \n \n **${prefix}instagram <username>** \n - Search for instagram accounts from the username \n \n **${prefix}whois <@user>** \n - Get information about the user`)

const Homeworks = new Discord.MessageEmbed()
.setColor("#0074ff")
.setTitle("**Homework:**")
.setDescription(`**Math (CORE)** \n Page 71, Question 24 - 27, 45 - 56 \n Due: (**TOMORROW!**) Tuesday 4rd August 2020 (4/08/2020), 8:00 AM`)

client.once("ready", () => {
    console.log("M2/6 EP Special Bot is online!");
    client.channels.cache.get("738983607661625405").send("**Bot is updated! Getting lastest homework list** :hourglass_flowing_sand:");
    client.channels.cache.get("738983607661625405").send(Homeworks);
    client.user.setActivity(`${prefix}help`); 
})

client.on("message", message =>{
    try{
        if(!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
        if(command === "help"){
            message.channel.send(Commands)
            message.channel.send(Help)
        } else if(command === "timetable"){
            message.channel.send(`${message.author.toString()} \n **Here!**`)
            message.channel.send({
                files: ["./images/timetable.jpg"]
            });
        } else if(command === "homework"){
            message.channel.send(`${message.author.toString()} \n **Here!**`)
            message.channel.send(Homeworks)
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
            if(message.channel.type === "dm"){
                if(message.author.username === "DOG CAT APPLE"){
                    if(!args){
                        return;
                    }
                    client.channels.cache.get("738334434809610332").send(args.join(" "))
                }
            }
        } else if(command === "ping"){
            async function run() {
                const msg = await message.channel.send(`🏓 Pinging....`);

                msg.edit(`🏓 Pong! Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`);
            }
            run();
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
            const love = Math.random() * 100;
            const loveIndex = Math.floor(love / 10);
            const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);
            const userArray =  message.mentions.members.array();
            const embed = new Discord.MessageEmbed()
                .setColor("#ffb6c1")
                .setDescription(`☁ ${userArray[0]} loves **${userArray[1]}** this much:`)
                .addField(`\n 💟 ${Math.floor(love)}% \n \n ${loveLevel}`);
    
            message.channel.send(embed);
        } else if(command === "meme"){
            async function run() {
                const subReddits = ["dankmeme", "meme", "me_irl"];
                const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        
                const img = await randomPuppy(random);
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setImage(img)
                    .setTitle(`From /r/${random}`)
                    .setURL(`https://reddit.com/r/${random}`);
        
                message.channel.send(embed);
            }
            run();
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
        } else if(command === "instagram"){
            async function run() {
                const name = args.join(" ");

                if (!name) {
                    return message.reply("Maybe it's useful to actually search for someone...!")
                        .then(m => m.delete(5000));
                }
        
                const url = `https://instagram.com/${name}/?__a=1`;
                
                let res; 
        
                try {
                    res = await fetch(url).then(url => url.json());
                } catch (e) {
                    return message.reply("I couldn't find that account... :(")
                        .then(m => m.delete(5000));
                }
        
                const account = res.graphql.user;
        
                const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(account.full_name)
                    .setURL(`https://instagram.com/${name}`)
                    .setThumbnail(account.profile_pic_url_hd)
                    .addField("Profile information", stripIndents`**- Username:** ${account.username}
                    **- Full name:** ${account.full_name}
                    **- Biography:** ${account.biography.length == 0 ? "none" : account.biography}
                    **- Posts:** ${account.edge_owner_to_timeline_media.count}
                    **- Followers:** ${account.edge_followed_by.count}
                    **- Following:** ${account.edge_follow.count}
                    **- Private account:** ${account.is_private ? "Yes 🔐" : "Nope 🔓"}`);
        
                message.channel.send(embed);
            }
            run();
        }
    }
    catch (err) {
        message.channel.send("**Error!**");
        message.channel.send("```" + err + "```");
    }
});

client.login(process.env.M26EPBotTOKEN);