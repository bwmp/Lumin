import { Command } from '~/types/objects';
import opts from '~/options/fun/spoiler';

export const spoiler: Command = {
  description: "makes text into spoilers",
  options: opts,
  execute: async function (interaction, args) {
    const sentence = args.getString("sentence", true)
    //split the sentence into array of letters
    const msg = sentence.split("")
    //add || to the start and end of each letter
    const msg2 = msg.map((letter) => {
      return `||${letter}||`
    })
    //join the array back into a string
    const spoilers = msg2.join("")
    interaction.editReply({ content: spoilers, allowedMentions: { parse: [] } })

  }
}