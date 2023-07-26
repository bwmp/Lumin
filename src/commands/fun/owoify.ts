import { Command } from '~/types/objects';
import opts from '~/options/fun/owoify';

export const owoify: Command = {
  description: "OWO what's this?",
  options: opts,
  execute: async function (interaction, args) {
    const sentence = args.getString("sentence", true)
    const msg = sentence.split(" ").join("+")
    const json = (await fetch(`https://nekos.life/api/v2/owoify?text=${msg}`)).json()
    const owo = (await json).owo
    interaction.editReply({ content: owo, allowedMentions: { parse: [] } })

  }
}