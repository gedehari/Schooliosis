import { registerAdmin } from '$lib/auth/server';
import { prismaClient } from './prismaClient';

export async function setup(params: { session: AppSession; instanceName: string; adminEmail: string; adminPassword: string }): Promise<boolean> {
	const instanceName = await prismaClient.config.upsert({
		where: {
			key: 'INSTANCE_NAME'
		},
		create: {
			key: 'INSTANCE_NAME',
			value: params.instanceName
		},
		update: {
			value: params.instanceName
		}
	});

	if (!instanceName) {
		return false;
	}

	if ((await registerAdmin(params.adminEmail, params.adminPassword, params.session)) != 'Ok') {
		return false;
	}

	const isDbConfigured = await prismaClient.config.upsert({
		where: {
			key: 'IS_CONFIGURED'
		},
		create: {
			key: 'IS_CONFIGURED',
			value: 'true'
		},
		update: {
			value: 'true'
		}
	});

	if (!isDbConfigured) {
		return false;
	}

	return true;
}
