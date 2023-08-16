import { SlashCommandBuilder, SlashCommandStringOption } from "discord.js";

export default async function options(cmd: SlashCommandBuilder) {
  cmd.addStringOption(
    new SlashCommandStringOption()
      .setName("emote")
      .setDescription("the emote to steal")
      .setRequired(true)
  ).addStringOption(
    new SlashCommandStringOption()
      .setName("name")
      .setDescription("the name of the emote")
      .setRequired(false)
  )
}