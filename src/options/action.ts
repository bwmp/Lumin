import { SlashCommandBuilder, SlashCommandUserOption } from "discord.js";

export default async function options(cmd: SlashCommandBuilder) {
    cmd.addUserOption(
        new SlashCommandUserOption()
            .setName("target")
            .setDescription("the target of the action.")
    )
}