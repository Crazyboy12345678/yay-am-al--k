
const Discord = require("discord.js") // version: 14.3.0
const db = require("inflames.db") // version: 2.5.3

module.exports = {
    slash: true,
    name: ["like"],
    description: "Kullanıcıyı Beğenin",
    option: [
        {
            name: "kullanıcı",
            description: "Kullanıcı Seç",
            type: "user",
            require: true
        },
        {
            name: "sebep",
            description: "Sebep Giriniz",
            type: "string",
            require: false
        }
    ],
    async execute(client, interaction) {

        const kanal = "1030779085816877148" //Like Log Kanalı

        const kullanıcı = interaction.options.getUser("kullanıcı")
        const sebep = interaction.options.getString("sebep") ? interaction.options.getString("sebep") : "Sebep Belirtilmemiş"

        const what = new Discord.EmbedBuilder()
        .setTitle("Kendine Like Atamazsın")
        .setColor("Red")
        if(kullanıcı.id === interaction.user.id) return interaction.reply({ embeds: [what] })

        if(!db.kontrol(`like_${kullanıcı.id}_${interaction.guild.id}`)) { db.yaz(`like_${kullanıcı.id}_${interaction.guild.id}`, 1) }

        const like = db.bul(`like_${kullanıcı.id}_${interaction.guild.id}`)

        const ilk = new Discord.EmbedBuilder()
        .setDescription(`${kullanıcı} Kullanıcısını Beğendiniz`)
        .setColor("Green")

        const embed = new Discord.EmbedBuilder()
        .setTitle(`Wassion - Like Sistemi`)
        .setDescription(`
        :+1: Kullanıcı Beğenildi
        
        👤 Beğenen: <@${interaction.user.id}>
        ❤️ Beğenilen: ${kullanıcı} | Toplam Beğenme: **${like}**
        ❓ Sebep: ${sebep}
        `)
        .setColor("Aqua")

        client.channels.cache.get(kanal).send({ embeds: [embed] })
        await interaction.reply({ embeds: [ilk] })

        db.topla(`like_${kullanıcı.id}_${interaction.guild.id}`, 1)

    }
}
