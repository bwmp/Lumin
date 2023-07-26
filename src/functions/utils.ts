import { CommandInteraction, EmbedBuilder, GuildMember } from "discord.js";
import actions from "~/misc/actions.json";
export function formatOrdinalNumber(number: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const remainder = number % 100;

  // If the remainder is between 11 and 13, use "th" suffix
  if (remainder >= 11 && remainder <= 13) {
      return number + "th";
  }

  // Otherwise, use the appropriate suffix based on the last digit
  const lastDigit = number % 10;
  return number + (suffixes[lastDigit] || "th");
}

export async function action(interaction: CommandInteraction, author: GuildMember, target: GuildMember | null) {
  const action = interaction.commandName.toLowerCase() as keyof typeof actions;
  let message

  if(target == null) {
    message = actions[action].singular.replace("{USERNAME}", author.user.username)
  }else{
    message = actions[action].plural.replace("{USERNAME}", author.user.username).replace("{MENTION}", target.user.username)
  }
  
  const json = (await fetch(`https://hmtai.hatsunia.cfd/v2/${action}`)).json()
  const image = (await json).url

  const embed = new EmbedBuilder()
    .setColor("Aqua")
    .setTitle(message)
    .setImage(image)
    .setTimestamp()

  return interaction.editReply({ embeds: [embed] })

}