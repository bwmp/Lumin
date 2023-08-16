import { Command } from '~/types/objects';
import commands from '~/lists/commands';
import { EmbedBuilder } from 'discord.js';
import opts from '~/options/utililtys/help';

export const help: Command = {
  description: 'list all commands or get info about a specific command',
  options: opts,
  execute: async function (interaction, args) {

    const commandName = args.get('command')?.value as string | undefined;

    if (commandName) {
      const command = commands.get(commandName);
      if (!command) {
        interaction.editReply({ content: 'Command not found' });
        return;
      }

      const embed = new EmbedBuilder()
        .setTitle(commandName)
        .setDescription(command.description)
        .setColor('#ffb8bf');

      interaction.editReply({ embeds: [embed] });
      return;
    }


    const categoriesMap = new Map<string, Command[]>();

    for (const [commandName, commandObject] of commands) {
      const name = Array.isArray(commandObject.name) ? commandName : commandObject.name;

      const category = commandObject.category || 'Uncategorized';
      if (!categoriesMap.has(category)) {
        categoriesMap.set(category, []);
      }

      categoriesMap.get(category)!.push({ ...commandObject, name });
    }

    const embed = new EmbedBuilder()
      .setTitle('Help')
      .setDescription('List of all commands')
      .setColor('#ffb8bf');

    // Add fields for each category
    categoriesMap.forEach((commands, category) => {
      embed.addFields({
        name: category,
        value: commands.map((command) => command.name).join(', '),
      });
    });

    interaction.editReply({ embeds: [embed] });
  },
  autoComplete: function (interaction) {
    const value = interaction.options.getFocused();

    const commandList = Array.from(commands.keys()).map((name) => ({ name: name, value: name }));

    const filtered = commandList.filter((choice) => {
      return choice.name!.toLowerCase().startsWith(value.toLowerCase());
    });

    if (filtered.length > 25) {
      const more = filtered.length - 25;
      filtered.length = 24;
      filtered.push({ name: `${more} more commands, please be more specific`, value: 'more' })
    }

    interaction.respond(filtered);

  },
};
