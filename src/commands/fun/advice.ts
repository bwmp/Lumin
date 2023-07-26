import { Command } from '~/types/objects';

export const advice: Command = {
  description: "Get random life advice",
  execute: async function (interaction, args) {
    const json = (await fetch("https://api.adviceslip.com/advice")).json()
    const advice = (await json).slip.advice
    interaction.editReply({ content: advice })
  }
}