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
    const ticketId = settings.ticketId
    const logChannelID = settings.logChannelID
    const nsfw = settings.nsfw
    const staffRole = settings.staffRole

    return { joinmessage, leavemessage, membercount, counting, ticketId, logChannelID, nsfw, staffRole };
}

export function formatOrdinalNumber(number: number): string {
    const suffixes = ["th", "st", "nd", "rd"];
    const remainder = number % 100;

    // If the remainder is between 11 and 13, use "th" suffix
    if (remainder >= 11 && remainder <= 13) {
        return number + "th";
    }

    // Otherwise, use the appropriate suffix based on the last digit
    const lastDigit = number % 10;
    return number + (suffixes[lastDigit] || "th");
}

export default prisma;