//Bu Kod Faruk#6126 Tarafından Kodlanmıştır

const akinator = require("discord.js-akinator")// version: 4.0.1

module.exports = {
    slash: true,
    name: ['akinatör'],
    description: 'Akinatör Oyunu Oynayın',
    option: [
        {
            name: 'oyun-modu',
            description: 'Oyun Modu Seç',
            type: 'string',
            require: true,
            choices: [
                { name: 'karakter', value: 'character'},
                { name: 'hayvan', value: 'animal'},
                { name: 'nesne', value: 'object'}
              ]
        }
    ],
	async execute(client, interaction) {

        const seçenek = interaction.options._hoistedOptions[0].value
        const language = "tr"; 
        const childMode = false; 
        const gameType = seçenek;
        const useButtons = true;
        const embedColor = "Aqua"

        akinator(interaction, {
            language: language,
            childMode: childMode,
            gameType: gameType, 
            useButtons: useButtons,
            embedColor: embedColor
        });
    }
}
//Bu Kod Faruk#6126 Tarafından Kodlanmıştır