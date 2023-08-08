import { prismaClient } from '$lib/server/prismaClient';
import bcrypt from 'bcrypt';
import type { LoginForm, LoginStatus, RegisterForm, RegisterStatus } from './types';
import { validateLogin } from './validation';

export async function login(session: AppSession, form: LoginForm): Promise<LoginStatus> {
	const isValid = validateLogin(form);
	if (isValid != 'Ok') {
		return isValid;
	}

	const user = await prismaClient.user.findFirst({
		where: {
			siswaNis: form.identityType == 'Siswa' ? parseInt(form.id) : undefined,
			guruNik: form.identityType == 'Guru' ? parseInt(form.id) : undefined,
			email: form.identityType == 'Admin' ? form.id : undefined
		}
	});

	if (!user || !(await bcrypt.compare(form.password, user.passwordHash))) {
		return 'InvalidLogin';
	}

	await session.set({ userId: user.id });

	return 'Ok';
}

export async function logout(session: AppSession) {
	await session.set({ userId: undefined });
}

export async function register(form: RegisterForm): Promise<RegisterStatus> {
	const userExists = await prismaClient.user.count({
		where: {
			siswaNis: form.identityType == 'Siswa' ? parseInt(form.id) : undefined,
			guruNik: form.identityType == 'Guru' ? parseInt(form.id) : undefined
		}
	});

	if (userExists) {
		return 'AlreadyRegistered';
	}

	if (form.identityType == 'Siswa') {
		const siswaExists = await prismaClient.siswa.count({
			where: { nis: parseInt(form.id) }
		});
		if (!siswaExists) {
			return 'IdNotRegistered';
		}
	} else if (form.identityType == 'Guru') {
		const teacherExists = await prismaClient.guru.count({
			where: { nik: parseInt(form.id) }
		});
		if (!teacherExists) {
			return 'IdNotRegistered';
		}
	} else {
		return 'Unknown';
	}

	const emailExists = await prismaClient.user.count({
		where: {
			email: form.email
		}
	});

	if (emailExists) {
		return 'EmailAlreadyUsed';
	}

	// TODO: add password policy

	const passwordHash = await bcrypt.hash(form.password, 16);

	const newUser = await prismaClient.user.create({
		data: {
			identityType: form.identityType,
			siswaNis: form.identityType == 'Siswa' ? parseInt(form.id) : undefined,
			guruNik: form.identityType == 'Guru' ? parseInt(form.id) : undefined,
			email: form.email,
			passwordHash
		}
	});

	if (!newUser) return 'ServerError';

	return 'Ok';
}

export async function registerAdmin(email: string, password: string, session: AppSession | undefined = undefined): Promise<RegisterStatus> {
	const exists = await prismaClient.user.count({
		where: {
			email
		}
	});

	if (exists) {
		return 'AlreadyRegistered';
	}

	const passwordHash = await bcrypt.hash(password, 16);

	const newUser = await prismaClient.user.create({
		data: {
			identityType: 'Admin',
			email,
			passwordHash
		}
	});

	if (!newUser) {
		return 'ServerError';
	}

	if (session) {
		await session.set({ userId: newUser.id });
	}

	return 'Ok';
}
