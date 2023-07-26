import { Command } from '~/types/objects';

export const cat: Command = {
  description: "KITTY EMOTICON",
  execute: async function (interaction, args) {
    const json = (await fetch("https://nekos.life/api/v2/cat")).json()
    const cat = (await json).cat
    interaction.editReply({ content: cat })
  }
}