import { env } from '$env/dynamic/private';
import { PrismaClient } from '@prisma/client';

export const prismaClient = globalThis.__prisma || new PrismaClient();

if (env.NODE_ENV === 'development') {
	globalThis.__prisma = prismaClient;
}
