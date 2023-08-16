import { schedule } from 'node-cron';
import { ActivityType, Client } from 'discord.js';

export default async (client: Client) => schedule('*/10 * * * * *', async () => {
  const activities = [
    ['Playing', '/help'],
    ['Watching', 'the stars!'],
    ['Watching', 'the sky.'],
    ['Watching', 'luminescent.dev'],
    ['Watching', 'lumin.luminescent.dev'],
    ['Competing', `${client.guilds.cache.size} servers!`],
  ];
  const i = Math.floor(Math.random() * activities.length);
  const activity = activities[i];
	client.user!.setPresence({ activities: [{ name: activity[1], type: ActivityType[activity[0] as Exclude<keyof typeof ActivityType, 'Custom'>] }], status: 'online' });
});