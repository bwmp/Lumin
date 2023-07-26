import { GuildMember } from 'discord.js';
import { action } from '~/functions/utils';
import { Command } from '~/types/objects';
import opts from '~/options/action';

export const act: Command = {
  name: ['bite', 'blush', 'bonk', 'boop', 'bully', 'cringe', 'cry', 'cuddle', 'dance', 'depression', 'feed', 'five', 'glomp', 'happy', 'hold', 'hug', 'kick', 'kill', 'kiss', 'lick', 'like', 'nom', 'nosebleed', 'pat', 'poke', 'punch', 'slap', 'sleep', 'smile', 'smug', 'tea', 'threaten', 'throw', 'tickle', 'wave', 'wink'],
  description: "{ACTION} someone",
  options: opts,
  execute: function (interaction, args) {
    try{
      action(interaction, interaction.member as GuildMember, args.getMember("target") as GuildMember | null)
    }catch(e){
      logger.error(e)
    }
  }
}
