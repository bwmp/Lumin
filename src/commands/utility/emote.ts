import { Command } from '~/types/objects';
import opts from '~/options/utililtys/emote';

export const emote: Command = {
  description: "Currently broken, don't use",
  options: opts,
  execute: function (interaction, args) {
    const emote = args.getString("emote", true);
    const name = args.getString("name", false) || emote.split(":")[1];
    const animated = emote.startsWith("<a:");
    const emojiId = emote.match(/([0-9]+)/) || "";
    interaction.guild?.emojis.create({attachment: `https://cdn.discordapp.com/emojis/${emojiId[0]}${animated ? '.gif' : '.png'}`, name});
    interaction.editReply({content: `Emote ${emote} has been stolen!`});
  }
}