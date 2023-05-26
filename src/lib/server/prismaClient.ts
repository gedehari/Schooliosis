import { env } from "$env/dynamic/private";
import { PrismaClient } from "@prisma/client"

export const prismaClient = global.__prisma || new PrismaClient();

if (env.NODE_ENV === "development") {
    global.__prisma = prismaClient;
}
