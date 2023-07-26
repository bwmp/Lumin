import { SlashCommandBuilder, SlashCommandStringOption } from "discord.js";

export default async function options(cmd: SlashCommandBuilder) {
    cmd.addStringOption(
        new SlashCommandStringOption()
            .setName("sentence")
            .setDescription("sentence to turn into spoilers.")
            .setRequired(true)
    )
}