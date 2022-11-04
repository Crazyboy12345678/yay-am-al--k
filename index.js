//botun main dosyası 

const discord = require("discord.js");
const client = new discord.Client({ intents: Object.values(discord.GatewayIntentBits).filter(x => typeof x === "string") });
const { token } = require("./src/base/settings.json");
require("./src/base/app.js")(client)

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const db = require("inflames.db");

client.once("ready", async () => {
  let channel = client.channels.cache.get("1038123637452058624");
  channel.messages.fetch("1038124148427345930").then(async message => {
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('btn1')
          .setLabel(' Link Ekle')
          .setEmoji('1038111765260673137')
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId('btn2')
          .setLabel(' Link Sil')
          .setEmoji('1038111777700982804')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId('btn3')
          .setLabel(' Linklerim')
          .setEmoji('1038084698615840768')
          .setStyle(ButtonStyle.Secondary),
      );
      const row2 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel(' Destek Sunucusu')
          .setURL("https://discord.gg/Dx4Xr3RCaa")
          .setEmoji('1038111768486088705')
          .setStyle(ButtonStyle.Link),
          new ButtonBuilder()
          .setCustomId('bura yok')
          .setLabel(' Happy Bot')
          .setEmoji('1038111785368162374')
          .setDisabled(true)
          .setStyle(ButtonStyle.Primary),
      );
      const row3 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel(' Botumuza Destek Vermek İçin Sunucunuza Ekleyin')
          .setURL("https://discord.com/api/oauth2/authorize?client_id=1037412606731882547&permissions=8&scope=bot%20applications.commands")
          .setEmoji('1018200886268412017')
          .setStyle(ButtonStyle.Link),
      );
  
    await message.edit({ content: '> Bütün Linkler Sizin Hesabınıza Yüklenir !', components: [row,row2,row3] });
  })
})

client.on("interactionCreate", async interaction => {
  if (interaction.isButton()) {
    const modal = new ModalBuilder()
  
    if(interaction.customId === "btn1") {
  
      let form1 = modal.setCustomId('add_link')
      .setTitle('Happy Uptime')
      .addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId('link_add')
            .setLabel("Eklemek istediğin linki gir.")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
        )
      )
  
      await interaction.showModal(form1)
  
    } else if(interaction.customId === "btn2") {
      let form2 = modal.setCustomId('delete_link')
      .setTitle('Happy Uptime')
      .addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId('link_delete')
            .setLabel("Silmek istediğin linki gir.")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
        )
      )
  
      await interaction.showModal(form2)
  
    } else if(interaction.customId === "btn3") {
      let embed = new EmbedBuilder()
        .setDescription(db.has("links_"+interaction.user.id) ? db.get("links_"+interaction.user.id).map((x, y) => `**${y+1}.** ${x}`).join("\n") : "Eklediğin hiç link yok.")

      interaction.reply({ embeds: [embed], ephemeral: true })
  
    }
  } else if(interaction.type === 5) {
    if(interaction.customId === "add_link") {
      let link = interaction.fields.getTextInputValue('link_add')
      if(db.has("links_"+interaction.user.id) && db.get("links_"+interaction.user.id).includes(link)) return interaction.reply("Bu link zaten mevcut!");
      client.channels.cache.get("1038124573079650355").send(interaction.user.tag+" adlı kullanıcı "+link+" linkini ekledi.")
      await db.push("links_"+interaction.user.id, link)
      interaction.reply("Link başarıyla eklendi <:xd:1035923494623510568>")
    } else if(interaction.customId === "delete_link") {
      let link = interaction.fields.getTextInputValue('link_delete')
      if(!db.has("links_"+interaction.user.id) || !db.get("links_"+interaction.user.id).includes(link)) return interaction.reply("Bu link zaten yok!");
      await db.set("links_"+interaction.user.id, db.get("links_"+interaction.user.id).filter(x => x !== link))
      if(db.get("links_"+interaction.user.id).length === 0) db.delete("links_"+interaction.user.id);
      interaction.reply("Link başarıyla silindi <:xd:1035923494623510568>")
    }
  }

})

client.on("guildCreate", async guild => {
    let { EmbedBuilder } = require("discord.js"); //bu satır hata verirse sizde zaten tanımlıdır silebilirsiniz.
    let user = await guild.fetchAuditLogs({ limit: 1, type: 28})
    let embed = new EmbedBuilder()
      .setTitle("Merhaba!")
      .setDescription("> Merhaba Dostum Botumuza Bir İyilik Yaptın Çok Şanslısın **Disney Plus** Cekilişine Katılma Şansını Kazandın.")
      .setFooter({ text: "Happy Uptime" })

      const row37 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel(' Destek Sunucusu')
          .setURL("https://discord.gg/Dx4Xr3RCaa")
          .setEmoji('1038111768486088705')
          .setStyle(ButtonStyle.Link),
      );
    user.entries.first().executor.send({ embeds: [embed], components: [row37]})
  })

client.login(token);
