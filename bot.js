//[======================] 🐺 Gerekli Ayarlar Başladı 🐺 [======================]

//Discord.js Kütüphanesini çağırdık
const Discord = require("discord.js");

//Bot, Client, Wolfram'ı birbirine bağladım
const client = new Discord.Client();
const bot = new Discord.Client();
var Wolfram = client;

//Gerekli Eklentiler
Jimp = require('jimp');
fs = require('fs');
moment = require('moment');

//Ayarlar dosyamızı ; bot, Wolfram, client ile bağladık.
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
  const command = args.shift().toLowerCase();
  const event = msg.content.toLower

  try {
    let commandFile = require(`./komutlar/${command}.js`);
    commandFile.run(client, msg, args);
  } catch (err) {}
});

//[======================] 🐺 Gerekli Ayarlar Bitti 🐺 [======================]



//[======================] 🐺 Kodlar Başladı 🐺 [======================]
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

Wolfram.on("message", message => {
  if (message.content.toLowerCase() === prefix + "sunucuresmi") {
    message.channel.sendEmbed(new Discord.RichEmbed()
      .setDescription(`Sunucu Resmi:`)
      .setImage(`${message.guild.iconURL} `)
      .setColor("RANDOM"));
  }
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

Wolfram.on('message', function(message) {
  if (message.content.startsWith(prefix + 'sor')) {
    const replies = ["Evet",
      "Belki",
      "Hayır",
      "Ben nereden bileyim?",
      "Hayır amq hayır",
      "Evet evet aynen ondan"
    ];
    message.replytext = Math.floor((Math.random() * replies.length) + 0);
    return message.reply(replies[message.replytext]);
  }
});

Wolfram.on('message', msg => {
  if (msg.content.startsWith(prefix + "saat")) {
    msg.channel.send(`${new Date().toLocaleString()}`);
  }
});

Wolfram.on("message", message => {
  if (message.content.toLowerCase() === prefix + 'kurulum') {
    if (message.author.id !== `${kurucu}`) {
      message.reply('Kurucumun izni olması lazım. Kurucum: <@274551537139712001> ');
    } else {
      message.channel.sendMessage(` :white_check_mark: Gerekli şeyleri başarılı bir şekilde kurdum.`).then(msg => {
        console.log(`Yeniden başlıyorum..`);
        message.guild.createChannel('${logkanalı}');
      })
    }
  }
});

Wolfram.on("message", message => {

  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0].toLowerCase();
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  console.log(message.author.username + " " + message.author.id + ": " + message.content.toString())

  if (command === "emojiyazı") {
    var letters = args.join("").toLowerCase().split("");
    var i = 0;
    var output = "";
    while (i < letters.length) {
      output = output + ":regional_indicator_" + letters[i] + ":";
      i++
    }
    message.delete()
    message.channel.sendMessage(output);
  }

});

Wolfram.on('message', async msg => {
  if (msg.content.toLowerCase() === prefix + 'yardım') {
    await msg.react('🇹');
    msg.react('🇲');
  }
});

Wolfram.on('message', async msg => {
  if (msg.content.toLowerCase() === '<@471335520098713600> yardım') {
    await msg.react('🇹');
    msg.react('🇲');
  }
});

Wolfram.on('message', msg => {
  if (msg.content.startsWith(prefix + "yaz")) {
    let mesaj = msg.content.substring(2 + 3);
    msg.delete();
    msg.channel.send(mesaj);
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

Wolfram.on('message', message => {
  if (message.content.toLowerCase() === prefix + "zekam") {
    var sans = ["11", "15", "20", "24", "28", "31", "39", "45", "49", "54", "58", "63", "67", "77", "73", "84", "80", "83", "96", "94", "99", "Albert Einstein mısın kardeşim?"];
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
    const embed = new Discord.RichEmbed()
      .addField(`***___Zekan___***`, `${sonuc}`)
    return message.channel.sendEmbed(embed);
  }
});

Wolfram.on('message', message => {
  if (message.content.toLowerCase() === prefix + "havadurumu") {
    var sans = ["☁", "⛅", "⛈", "🌤", "🌥", "🌦", "🌧", "🌩", "🌪"];
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
    const embed = new Discord.RichEmbed()
      .addField(`***___Hava Durumu___***`, `${sonuc}`)
    return message.channel.sendEmbed(embed);
  }
});

Wolfram.on('message', message => {
  if (message.content.toLowerCase() === prefix + "espriyap") {
    var sans = ["Geçen gün geçmiş günlerimi aradım ama meşguldü.", "Yağmur yağmış kar peynir", "Dünya dönermiş ay da köfte…", "Bu erikson başka erik yok.", "Yıkanan Ton a ne denir Washington", "Hadi oyun oynayalım. Vazgeçtim oymadan oynayalım!", "Geçen gün kamyonu sürdüm Leonardo da Vinci.", "Doğumdan sonra çok kilo aldım. Doğduğumda 2 kiloydum şimdi 62.", "Adam 7 gün boyunca nezle olmuş. Sıkılmış bugün de Petek le olayım demiş.", "Yarasa yararlı bir hayvandır. Yararlı bir hayvan olmasaydı yaramasa derlerdi.", " Benim neden kardeşim yok baba  Seni görünce ikincisine cesaret edemedik.", "Osmanlıda kimseye borç takamıyordun mesela sikke sikke ödüyodun…", "Tatlı yiyip, tatlı konuşuluyorsa bundan sonra mantı yiyip mantıklı konuşacağız.", "Babamı sahura kaldırmayı unuttuk anneme masada ne eksik diyorum tuzluk mu diyor.", "+Okeyde kıza elin nasıl dedim. Ojeli dedi. Ben Şoka girdim. O Migrosa.", "Canım sıkkın kanka sonra gel"];
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
    const embed = new Discord.RichEmbed()
      .addField(`***___Espri___***`, `${sonuc}`)
    return message.channel.sendEmbed(embed);
  }
});

Wolfram.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(' ')[0];
  command = command.slice(prefix.length);

  let args = message.content.split(' ').slice(1);

  if (command === 'topla') {
    let numArray = args.map(n => parseInt(n));
    let total = numArray.reduce((p, c) => p + c);
    message.channel.sendMessage(`${total}`);
  }
  if (command === 'çıkar') {
    let numArray = args.map(n => parseInt(n));
    let total = numArray.reduce((p, c) => p - c);
    message.channel.sendMessage(`${total}`);
  }
  if (command === 'çarp') {
    let numArray = args.map(n => parseInt(n));
    let total = numArray.reduce((p, c) => p * c);
    message.channel.sendMessage(`${total}`);
  }
  if (command === 'böl') {
    let numArray = args.map(n => parseInt(n));
    let total = numArray.reduce((p, c) => p / c);
    message.channel.sendMessage(`${total}`);
  }
  if (command === "avatar") {
    let member = message.mentions.members.first()
    let embed = new Discord.RichEmbed()
      .setImage(message.author.avatarURL)
    if (!member)
      return message.channel.send(embed)
    let second = new Discord.RichEmbed()
      .setImage(member.user.avatarURL)
    message.channel.send(second)
  }
});

Wolfram.on("message", msg => {
  const kufur = ["yarrak", "piç", "sikerim", "sik", "göt"];
  if (kufur.some(word => msg.content.includes(word))) {
    msg.reply("Neden küfür ediyorsun? Burası saygılı bir ortam!")
    msg.react('😡')
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

Wolfram.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + "sigara") {
    msg.channel.send(':smoking: :cloud::cloud::cloud:')
      .then(nmsg => nmsg.edit(':smoking: :cloud::cloud::cloud:'))
      .then(nmsg => nmsg.edit(':smoking: :cloud::cloud:'))
      .then(nmsg => nmsg.edit(':smoking: :cloud::cloud:'))
      .then(nmsg => nmsg.edit(':smoking: :cloud:'))
      .then(nmsg => nmsg.edit(':smoking: :cloud:'))
      .then(nmsg => nmsg.edit('**Sigaram bitti** | **Sigara İçmeyiniz.** :no_smoking: **Sigara Sağlığa Zararlıdır**'));
  }
});


Wolfram.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + "ping") {
    msg.channel.send('Pong!')
      .then(nmsg => nmsg.edit(`<:GWdbhThonk:441544602835484672> **${Math.round(bot.ping)}ms**`));
  }
});

Wolfram.on("message", message => {

  if (message.content.toLowerCase() === prefix + "davet") {
    const embed = new Discord.RichEmbed()
      .setDescription('Davet linkim için [üzerime tıkla.](https://discordapp.com/oauth2/authorize?client_id=439756873311322112&permissions=8&scope=bot)')
    return message.channel.sendEmbed(embed);
  }

  if (message.content.toLowerCase() === "wolfram") {
    message.reply("Yardıma mı ihtiyacın var?\n ${prefix}yardım")
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


  if (message.content.toLowerCase() === prefix + "sunucubilgi") {
    const embed = new Discord.RichEmbed()
      .setTimestamp()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .addField('Sunucu Adı:', message.guild.name)
      .addField('Sunucu ID:', message.guild.id)
      .addField('Ana kanal:', message.guild.defaultChannel)
      .addField('Sunucu Bölgesi:', message.guild.region)
      .addField('Üye sayısı:', message.guild.memberCount)
      .addField('Sahibi:', message.guild.owner + ' (' + message.guild.ownerID + ')')
      .addField('Kanal sayısı:', message.guild.channels.size)
      .addField('Oluşturulma tarihi:', message.guild.createdAt)
      .setColor("RANDOM")

    return message.channel.sendEmbed(embed)
  }

  if (message.content.toLowerCase() === prefix + "botbilgi") {
    const embed = new Discord.RichEmbed()
      .addField("Bot Sahibi", `<@${kurucu}>`, true)
      .addField("Sürüm", "${sürüm}", true)
      .addField("Toplam Sunucu Sayısı", bot.guilds.size, true)
      .addField("Toplam Kullanıcı Sayısı", bot.users.size, true)
      .addField("Toplam Kanal Sayısı", bot.channels.size, true)
      .addField("Kitaplık Türü", "discord.js")
      .setColor("RANDOM")
    return message.channel.sendEmbed(embed)
  }
  if (message.content.toLowerCase() === prefix + "yardım") {
    const embed = new Discord.RichEmbed()
      .setTitle("")
      .setDescription('')
      .setColor("RANDOM")
      .addField("Komutlar", `**${prefix}anakomutlar** - Bilgi Komutları \n**${prefix}eğlence** - Eğlence Komutları \n**${prefix}moderasyon** - Moderasyon Komutları \n**${prefix}kişisel** - Kişisel komutlar`)
      .addField("Bağlantılar", "[Davet Linki](http://bobzillaa.rf.gd) | [Destek Sunucusu](https://discord.gg/DZsZsEG) | [Web Site](http://bobzillaa.rf.gd)")
      .setFooter('Eğer "${logkanalı}" adında bir kanal oluşturursanız bot log durumlarını söyler.')
      .setThumbnail(`${message.author.avatarURL}`)

    return message.channel.sendEmbed(embed)
  }

  if (message.content.toLowerCase() === "<@471335520098713600> yardım") {
    const embed = new Discord.RichEmbed()
      .setTitle("")
      .setDescription('')
      .setColor("RANDOM")
      .addField("Komutlar", `**${prefix}anakomutlar** - Bilgi Komutları \n**${prefix}eğlence** - Eğlence Komutları \n**${prefix}moderasyon** - Moderasyon Komutları \n**${prefix}kişisel** - Kişisel komutlar`)
      .addField("Bağlantılar", "[Davet Linki](https://discordapp.com/oauth2/authorize?client_id=439756873311322112&permissions=8&scope=bot) | [Destek Sunucusu](https://discord.gg/DZsZsEG) | [Web Site](https://notechbot.glitch.me/)")
      .setFooter('Eğer "${logkanalı}" adında bir kanal oluşturursanız bot log durumlarını söyler.')
      .setThumbnail(`${message.author.avatarURL}`)

    return message.channel.sendEmbed(embed)
  }

  if (message.content.toLowerCase() === prefix + "panel") {
    const embed = new Discord.RichEmbed()
      .setTitle("")
      .setDescription('')
      .setColor("RANDOM")
      .addField("Komutlar", `[**Anakomutlar**](https://discord.gg/DZsZsEG) Aktif :white_check_mark: \n[**Eğlence**](https://discord.gg/DZsZsEG) Aktif :white_check_mark: \n[**Kişisel**](https://discord.gg/DZsZsEG) Aktif :white_check_mark: \n[**Moderasyon**](https://discord.gg/DZsZsEG) Disaktif :x:`)
      .setFooter('')

    return message.channel.sendEmbed(embed)
  }

  if (message.content.toLowerCase() === prefix + "anakomutlar") {
    const embed = new Discord.RichEmbed()
      .setTitle("")
      .setDescription('')
      .setColor("RANDOM")
      .addField("${botadı} Ana Komutları", `**${prefix}kurulum** - Bot için gerekli dosyaları hazırlar. \n**${prefix}istatistik** - Botun istatistiğini gösterir. \n**${prefix}ping** - Botun pingini ölçer. \n**${prefix}sunucubilgi** - Sunucu hakkkında detaylı bilgi verir. \n**${prefix}sunucuresmi** - Sunucunun resmini gönderir. \n**${prefix}yardım** - Botun bütün komutlarını size gösterir. \n**${prefix}botbilgi** - Bot hakkında bilgi verir. \n**${prefix}davet** - Botun davet linkini atar. \n**${prefix}panel** - Komut panelini gösterir.`)
      .setFooter('')

    return message.channel.sendEmbed(embed)
  }

  if (message.content.toLowerCase() === prefix + "kişisel") {
    const embed = new Discord.RichEmbed()
      .setTitle("")
      .setDescription('')
      .setColor("RANDOM")
      .addField("${botadı} Kişisel Komutları", `**${prefix}sikayet** - Yazdığınız şikayeti sunucunun kurucusuna iletir. \n**${prefix}avatar** - Bot sizin veya etiketlediğiniz kişinin avatarını gösterir. \n**${prefix}sor** - Sorduğunuz soruya kısa cevaplar verir.  \n**${prefix}blok** - Yazdığınız mesajı blok olarak gönderir. \n**${prefix}yaz** - Yazdığınız mesajı bota yazdırır. \n**${prefix}çekiliş** - Sunucudan rastgele birisini seçer.`)
      .setFooter('')

    return message.channel.sendEmbed(embed)
  }

  if (message.content.toLowerCase() === prefix + "eğlence") {
    const embed = new Discord.RichEmbed()
      .setTitle("")
      .setDescription('')
      .setColor("RANDOM")
      .addField("${botadı} Eğlence Komutları", `**${prefix}havadurumu** - Bot rastgele havadurumu emojisi atar. \n**${prefix}espriyap** - Bot espri yapar. \n**${prefix}zekam** - Zeka puanınızı gösterir. \n**${prefix}matematik** - Matematik işlemi yapar. \n**${prefix}sigara** - Bot sigara içer.`)
      .setFooter('')

    return message.channel.sendEmbed(embed)
  }

  if (message.content.toLowerCase() === prefix + "moderasyon") {
    const embed = new Discord.RichEmbed()
      .setTitle("")
      .setDescription('')
      .setColor("RANDOM")
      .addField("${botadı} Moderasyon Komutları", `**${prefix}kick** - Etiketlenen kişiyi sunucudan atar. [BAKIM] \n**${prefix}mute** - Etiketlenen kişiyi susturur. [BAKIM] \n**${prefix}ban** - Etiketlenen kişiyi sunucudan banlar. [BAKIM] \n**${prefix}temizle** - Bot belirttiğiniz kadar mesaj siler. [BAKIM] \n**${prefix}yenile** - Botu yeniden başlatır. \n**${prefix}ekip** - Botun ekibini gösterir.`)
      .setFooter('')

    return message.channel.sendEmbed(embed)
  }

  if (message.content.toLowerCase() === prefix + "matematik") {
    const embed = new Discord.RichEmbed()
      .setTitle("")
      .setDescription('')
      .setColor("RANDOM")
      .addField("${botadı} Matematik Komutları", `**${prefix}topla** - Yazdığınız iki sayıyı toplar. \n**${prefix}çıkar** - Yazdığınız iki sayıyı çıkarır. \n**${prefix}çarp** - Yazdığınız iki sayıyı çarpar. \n**${prefix}böl** - Yazdığınız iki sayıyı böler.`)
      .setFooter(`Kullanım: ${prefix}topla 1 1`)

    return message.channel.sendEmbed(embed)
  }
});

Wolfram.on("message", message => {
  const args = message.content.split(" ").slice(1);

  if (message.content.startsWith(prefix + "eval")) {
    if (message.author.id !== `${kurucu}`) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {
        code: "xl"
      });
    } catch (err) {
      message.channel.send(`\`HATA\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
});

Wolfram.on("guildMemberAdd", async member => {
  const veri = client.provider.get(member.guild.id, "hosGeldinK", []);
  if (veri == !true) return;
  if (veri === true) {
    const kanalveri = client.provider.get(member.guild.id, "hosGeldin", []);
    let username = member.user.username;
    if (member.guild.channels.get(kanalveri) === undefined || member.guild.channels.get(kanalveri) === null) return;
    if (member.guild.channels.get(kanalveri).type === "text") {
      let randname = await randomString(16, 'aA');
      const bg = await Jimp.read("./guildAdd.png");
      const userimg = await Jimp.read(member.user.avatarURL);
      var font;
      if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
      else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
      else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
      await bg.print(font, 430, 170, member.user.tag);
      await userimg.resize(362, 362);
      await bg.composite(userimg, 43, 26).write("./img/" + randname + ".png");
      setTimeout(function() {
        member.guild.channels.get(kanalveri).send(new Discord.Attachment("./img/" + randname + ".png"));
      }, 1000);
      setTimeout(function() {
        fs.unlink("./img/" + randname + ".png");
      }, 10000);
    }
  }
})

Wolfram.on("guildMemberRemove", async member => {
  const veri = client.provider.get(member.guild.id, "hosGeldinK", []);
  if (veri == !true) return;
  if (veri === true) {
    const kanalveri = client.provider.get(member.guild.id, "hosGeldin", []);
    let username = member.user.username;
    if (member.guild.channels.get(kanalveri) === undefined || member.guild.channels.get(kanalveri) === null) return;
    if (member.guild.channels.get(kanalveri).type === "text") {
      let randname = await randomString(16, 'aA');
      const bg = await Jimp.read("./guildRemove.png");
      const userimg = await Jimp.read(member.user.avatarURL);
      var font;
      if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
      else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
      else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
      await bg.print(font, 430, 170, member.user.tag);
      await userimg.resize(362, 362);
      await bg.composite(userimg, 43, 26).write("./img/" + randname + ".png");
      setTimeout(function() {
        member.guild.channels.get(kanalveri).send(new Discord.Attachment("./img/" + randname + ".png"));
      }, 1000);
      setTimeout(function() {
        fs.unlink("./img/" + randname + ".png");
      }, 10000);
    }
  }
});
//[======================]  Kodlar Bitti  [======================]

Wolfram.login("${token}");


//BOT BİTTİ :)
