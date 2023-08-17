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
  let message;

  if (target == null) {
    message = actions[action].singular.replace("{USERNAME}", author.user.username);
  } else {
    message = actions[action].plural
      .replace("{USERNAME}", author.user.username)
      .replace("{MENTION}", target.user.username);
  }

  let image;
  let attempts = 0;

  while (!image && attempts < 5) {
    attempts++;

    try {
      image = await fetch(`https://hmtai.hatsunia.cfd/v2/${action}`)
        .then((res) => res.json())
        .then((json) => json.url);
    } catch (e) {
      if(e instanceof Error){
        console.log(`Error fetching image: ${e.message}`);
      }else{
        console.log(`Error fetching image: ${e}`);
      }
    }

    if (!image) {
      interaction.editReply({ content: `Failed to fetch image. Retrying... Attempt ${attempts}/5` });
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  if (!image) {
    return interaction.editReply({ content: "Failed to fetch image." });
  }

  const embed = new EmbedBuilder()
    .setColor("Aqua")
    .setTitle(message)
    .setImage(image)
    .setTimestamp();

  return interaction.editReply({ embeds: [embed] });
}