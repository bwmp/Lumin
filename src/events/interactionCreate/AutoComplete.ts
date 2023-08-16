import { AutocompleteInteraction, Client } from "discord.js";
import commands from "~/lists/commands";

export default async (client: Client, interaction: AutocompleteInteraction) => {
  
  if (!(interaction instanceof AutocompleteInteraction)) return;

  const command = commands.get(interaction.commandName);
  
  if (!command || !command.autoComplete) return;

  await command.autoComplete(interaction);
};