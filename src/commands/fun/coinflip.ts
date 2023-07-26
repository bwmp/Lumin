import { Command } from '~/types/objects';

export const coinflip: Command = {
  description: "flip a coin",
  execute: function (interaction, args) {
    const result = Math.random() > 0.5 ? "I flipped heads!" : "I flipped tails!"
    interaction.editReply({ content: result })
  }
}