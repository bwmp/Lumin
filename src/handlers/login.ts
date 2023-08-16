import { Client } from 'discord.js';

export default (client: Client<true>) => {
  client.login(process.env.TOKEN);
  logger.info('Bot logged in');
};