import { Command } from '~/types/objects';

export const fact: Command = {
  description: "idk random fact",
  execute: async function (interaction, args) {
    const json = (await fetch("https://nekos.life/api/v2/fact")).json()
    const fact = (await json).fact
    interaction.editReply({ content: fact, allowedMentions: { parse: [] } })
  }
}