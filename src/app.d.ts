// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient } from "@prisma/client";

interface SessionData {
	userId?: number
}

// for information about these interfaces
declare global {
	type AppSession = import("svelte-kit-cookie-session").Session<SessionData>

	namespace App {
		// interface Error {}

		interface Locals {
			session: AppSession
		}

		// interface PageData {}

		// interface Platform {}
	}

	var __prisma: PrismaClient //eslint-disable-line no-var
}

export {};
