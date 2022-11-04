        

const Discord = require('discord.js') // version: 14.3.0

module.exports = {
    slash: true,
    name: ['uptime'],
    description: 'Yenilenen Ping Komutu',
    async execute(client, interaction) {

        const embed = new Discord.EmbedBuilder()
        .setTitle('Happy Uptime')
        .setDescription(`
        En Kaliteli Uptime Sistemi}
        Kullanmak İçin Butonları Kullanın}
        `)
        .setColor('Blue')
        await interaction.reply({ embeds: [embed]})
    
    }
}

