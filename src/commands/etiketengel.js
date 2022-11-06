
const Discord = require('discord.js') // version: 14.2.0

/*
Siz Yetki Kontrolü Eklersiniz 

Gerekli Yetki: Kanalları Yönet
*/

module.exports = {
    slash: true,
    name: ['etiket-engel'],
    description: 'Sunucudaki Kullanıcıların Everyone veya Here Atmasını Engelleyin',
    option: [
        {
            name: 'aktiflik',
            description: 'Aktiflik Durumu',
            type: 'string',
            require: true,
            choices: [
                { name: 'Aktif', value: 'ee_aktif' },
                { name: 'Pasif', value: 'ee_pasif' }
              ]
        }
    ],
	async execute(client, interaction) {

        var seçenek = interaction.options._hoistedOptions[0].value

        if (seçenek === 'ee_aktif') {

            interaction.guild.channels.cache.forEach(channel => {
            let everyone = interaction.guild.roles.cache.find(a => a.name === '@everyone')
            channel.permissionOverwrites.edit(everyone, { 'MentionEveryone': false }, interaction.user.tag + ' Tarafından Kapatıldı');
            })      

            const başarılı = new Discord.EmbedBuilder()
            .setDescription(`<:xd:1030766693389172767> Etiket Engel Sistemi Başarıyla **Açıldı**`)
            .setColor('Green')  
            await interaction.reply({ embeds: [başarılı] })
        
        } else if (seçenek === "ee_pasif") {
            
            interaction.guild.channels.cache.forEach(channel => {
                let everyone = interaction.guild.roles.cache.find(a => a.name === '@everyone')
                channel.permissionOverwrites.edit(everyone, { 'MentionEveryone': true }, interaction.user.tag + ' Tarafından Açıldı');
            })  
        
            const başarılık = new Discord.EmbedBuilder()
            .setDescription(`✅ Etiket Engel Sistemi Başarıyla **Kapatıldı**`)
            .setColor('Green') 
            await interaction.reply({ embeds: [başarılık] })
        
        } 
	},
};
