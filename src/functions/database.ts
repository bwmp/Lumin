import { PrismaClient } from "@prisma/client";
import { countingData, joinleaveMessage, memberCount } from "~/interfaces/database";

const prisma = new PrismaClient();
logger.info("Prisma client initialized");

export async function getSettings(guildId: string) {
    const settings = await prisma.settings.upsert({
        where: {
            guildId: guildId,
        },
        create: {
            guildId: guildId,
        },
        update: {},
    });

    const joinmessage = JSON.parse(settings.joinmessage || '{}') as joinleaveMessage;
    const leavemessage = JSON.parse(settings.leavemessage || '{}') as joinleaveMessage;
    const membercount = JSON.parse(settings.membercount || '{}') as memberCount;
    let counting = JSON.parse(settings.counting || '{}');
    counting.count = parseInt(counting.count) || 0;
    counting.maxcount = parseInt(counting.maxcount) || 0;
    counting = counting as countingData;
    const logChannelID = settings.logChannelID
    const nsfw = settings.nsfw
    const staffRole = settings.staffRole

    return { joinmessage, leavemessage, membercount, counting, logChannelID, nsfw, staffRole };
}

export default prisma;