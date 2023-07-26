import { EmbedBuilder } from 'discord.js';
import { Command } from '~/types/objects';

const responses = [
  "It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes definitely.",
  "You may rely on it.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Yes.",
  "Signs point to yes.",
  "Reply hazy try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",
  "Don't count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful.",
  "No way.",
  "Maybe",
  "The answer is hiding inside you",
  "No.",
  "Depends on the mood of the CS god",
  "Hang on",
  "It's over",
  "It's just the beginning",
  "Good Luck"
];

import opts from '~/options/fun/8ball';

export const eightball: Command = {
  name: "8ball",
  description: "Ask the magic 8ball a question",
  options: opts,
  execute: async function (interaction, args) {
    const question = args.getString("question", true)
    const embed = new EmbedBuilder()
    .setColor("#0099ff")
    .setTitle("🎱 8ball")
    .setDescription("{USERNAME} asks '{QUESTION}'\nI say: {RESPONSE}".replace("{USERNAME}", interaction.user.username).replace("{QUESTION}", question).replace("{RESPONSE}", responses[Math.floor(Math.random() * responses.length)]))
    
    interaction.editReply({ embeds: [embed] })

  }
}