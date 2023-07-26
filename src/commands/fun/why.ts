import { Command } from '~/types/objects';

export const why: Command = {
  description: "sends random why question",
  execute: async function (interaction, args) {
    const json = (await fetch("https://nekos.life/api/v2/why")).json()
    const why = (await json).why
    interaction.editReply({ content: why, allowedMentions: { parse: [] } })
  }
}