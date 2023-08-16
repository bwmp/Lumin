import { SlashCommandBuilder, SlashCommandStringOption } from "discord.js";

export default async function options(cmd: SlashCommandBuilder) {
    cmd.addStringOption(
        new SlashCommandStringOption()
            .setName("command")
            .setDescription("the command to receive more info on.")
            .setAutocomplete(true)
    )
}