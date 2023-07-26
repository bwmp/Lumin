import { EmbedBuilder, version } from "discord.js";
import moment from "moment";
import os from "os";
import si from "systeminformation";
import { Command } from "~/types/objects";

export const status: Command = {
  description: "shows the status of the bot",
  execute: async function (interaction, args) {
    " D [days], H [hrs], m [mins], s [secs]"
		const duration = moment.duration(interaction.client.uptime).humanize();
		const cpu = await si.cpu();
		let ccount = interaction.client.channels.cache.size;
		let scount = interaction.client.guilds.cache.size;
		let mcount = 0; 
		interaction.client.guilds.cache.forEach(guild => {
			mcount += guild.memberCount; 

		});
		const embed = new EmbedBuilder()
            .setColor("#f0ccfb")
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .setDescription(`🔎 **Status**
			**= STATISTICS =**
			**• Servers** : ${scount}
			**• Channels** : ${ccount}
			**• Users** : ${mcount}
			**• Discord.js** : v${version}
			**• Node** : ${process.version}
			**= SYSTEM =**
			**• Platfrom** : ${os.type}
			**• Uptime** : ${duration}
			**• CPU** :
			> **• Cores** : ${cpu.cores}
			> **• Model** : ${os.cpus()[0].model} 
			> **• Speed** : ${os.cpus()[0].speed} MHz
			**• MEMORY** :
			> **• Total Memory** : ${(os.totalmem() / 1024 / 1024).toFixed(2)} Mbps
			> **• Free Memory** : ${(os.freemem() / 1024 / 1024).toFixed(2)} Mbps
			> **• Heap Total** : ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} Mbps
			> **• Heap Usage** : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Mbps
			`);
		interaction.editReply({embeds: [embed]});
	}
}; 