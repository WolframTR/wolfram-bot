//Discord.js Kütüphanesini çağırdık
const Discord = require('discord.js');

//Bot, Client, Wolfram'ı birbirine bağladım
const client = new Discord.Client();
const bot = new Discord.Client();
const Wolfram = new Discord.Client();

//Gerekli Eklentiler
Jimp = require('jimp');
fs = require('fs');
moment = require('moment');

//Ayarlar dosyamız
const ayarlar = require('./ayarlar.json');

//Ayarlar Dosyasındakiler
var prefix = ayarlar.prefix;
var token = ayarlar.token;
var kurucu = ayarlar.kurucu;
var sürüm = ayarlar.sürüm;
var botadı = ayarlar.botadı;
var telifhakkı = ayarlar.telifhakkı;
var logkanalı = ayarlar.logkanalı;
var dmkanalı = ayarlar.dmkanalı;
var botuekleyenlerkanalı = ayarlar.botuekleyenlerkanalı;
var botuatanlarkanalı = ayarlar.botuatanlarkanalı;
var girişrolü = ayarlar.girişrolü;
var başarılı = ayarlar.basarılı;
var başarısız = ayarlar.basarısız;

//DOSYALARI KOMUT OLARAK ALGILAMASI ICIN
Wolfram.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.content.indexOf(prefix) !== 0) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const komut = args.shift().toLowerCase();
  const event = msg.content.toLower

  try {
    let komutDosyası = require(`./komutlar/${komut}.js`);
    komutDosyası.run(client, msg, args);
  } catch (err) {}
});

// KODLARIMIZ


Wolfram.on("ready", () => {
  bot.user.setStatus('streaming');
  bot.channels.get("471987685511397386").send(`-------------------------------------- \n**Bot başarıyla başlatıldı!** \n**Gecikme:** ${bot.ping} \n**Zamanlama:** ${new Date().toLocaleString()} \n**${botadı} bot hazır.**`)
  bot.user.setGame(`🐺 ${prefix}yardım ${prefix}davet 🐺`, "https://www.twitch.tv/enesonurata");
  console.log("Bot Basariyla Baslatildi")
});

Wolfram.on('guildCreate', guild => {
  let channel = bot.channels.get("${botuekleyenlerkanalı}")
  const embed = new Discord.RichEmbed()
    .setColor("Green")
    .setAuthor(`🐺 Eklediler 🐺`)
    .setThumbnail(guild.iconURL)
    .addField("Sunucu Adı", guild.name)
    .addField("Kurucu", guild.owner)
    .addField("Sunucu ID", guild.id, true)
    .addField("Toplam Kullanıcı", guild.memberCount, true)
    .addField("Toplam Kanal", guild.channels.size, true)
    .setFooter("${telifhakkı}")
  channel.send(embed);
});

Wolfram.on('guildDelete', guild => {
  let channel = bot.channels.get("${botuatanlarkanalı}")
  const embed = new Discord.RichEmbed()
    .setColor("Red")
    .setAuthor(`🐺 Attılar 🐺`)
    .setThumbnail(guild.iconURL)
    .addField("Sunucu Adı", guild.name)
    .addField("Kurucu", guild.owner)
    .addField("Sunucu ID", guild.id, true)
    .addField("Toplam Kullanıcı", guild.memberCount, true)
    .addField("Toplam Kanal", guild.channels.size, true)
    .setFooter("${telifhakkı}")
  channel.send(embed);
});

Wolfram.on('guildCreate', async guild => {
  const girismesaj = [
    '**${botadı}** sunucunuza başarıyla eklendi.',
    `Botumuzun özelliklerini öğrenmek için ${prefix}yardım yazabilirsiniz.`,
  ]
  guild.owner.send(girismesaj)
});

Wolfram.on("message", message => {
  if (message.content.toLowerCase() === prefix + "parti") {
    message.channel.sendEmbed(new Discord.RichEmbed()
      .setDescription(`<a:disko:443135556185096212> <a:disko:443135556185096212> <a:disko:443135556185096212> <a:disko:443135556185096212> <a:disko:443135556185096212> <a:disko:443135556185096212> <a:disko:443135556185096212> <a:disko:443135556185096212> <a:disko:443135556185096212>`)
      .setColor("RANDOM"));
  }
});

Wolfram.on('message', async msg => {
  if (msg.content.toLowerCase() === '<@471335520098713600> yardım') {
    await msg.react('🇹');
    msg.react('🇲');
  }
});

Wolfram.on('message', msg => {
  if (msg.content.startsWith(prefix + "çekiliş")) {
    msg.channel.send(`Çekilişi Kazanan: **${msg.guild.members.random().displayName}**`);
  }
});

Wolfram.on('message', msg => {
  if (msg.content.startsWith(prefix + "şikayet")) {
    let mesaj = msg.content.substring(2 + 3);
    msg.delete();
    msg.guild.owner.send(`Şikayet Bildiren: **${msg.author.tag}** \nŞikayet: ` + mesaj);
  }
});

Wolfram.on("message", message => {
  const dmchannel = bot.channels.find("name", "${dmkanalı}");
  if (message.channel.type === "dm") {
    if (message.author.id === bot.user.id) return;
    dmchannel.sendMessage("", {
      embed: {
        color: 000007,
        title: `Yazan: ${message.author.tag} ID: ${message.author.id}`,
        description: `${message.content}`
      }
    })
  }
  if (message.channel.bot) return;
});

Wolfram.on('guildMemberAdd', member => {
  let guild = member.guild;
  let joinRole = guild.roles.find('name', '${girişrolü}');
  member.addRole(joinRole);

  const channel = member.guild.channels.find('name', '${logkanalı}');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
    .setColor('0x00cc44')
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .setTitle(`<a:parti:443114800843587599> ${member.user.username} Sunucuya katıldı. \n[${member.guild.memberCount} Kişi]`)
    .setTimestamp()
  channel.sendEmbed(embed);
});

Wolfram.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', '${logkanalı}');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
    .setColor('0xff1a1a')
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .setTitle(`<:kizgin:441544726596943872> ${member.user.username} Sunucudan ayrıldı. \n[${member.guild.memberCount} Kişi]`)
    .setTimestamp()
  channel.sendEmbed(embed);
});

Wolfram.on("message", message => {

  if (message.content.toLowerCase() === prefix + "davet") {
    const embed = new Discord.RichEmbed()
      .setDescription('Davet linkim için [üzerime tıkla.](https://discordapp.com/oauth2/authorize?client_id=439756873311322112&permissions=8&scope=bot)')
    return message.channel.sendEmbed(embed);
  }

  if (message.content.toLowerCase() === "wolfram") {
    message.reply("Yardıma mı ihtiyacın var?\n **${prefix}yardım**")
  }

  if (message.content.toLowerCase() === prefix + 'yenile') {
    if (message.author.id !== `${kurucu}`) {
      message.reply('Kurucum Değilsin! :x:');
    } else {
      message.channel.sendMessage(`:white_check_mark: Başarıyla Yenileniyorum`).then(msg => {
        console.log(`Yeniden Basliyorum...`);
        process.exit(0);
      })
    }
  }
});

Wolfram.login('${token}');
