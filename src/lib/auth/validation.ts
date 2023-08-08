import type { LoginForm, LoginStatus, RegisterForm, RegisterStatus } from './types';

export function validateLogin(form: LoginForm): LoginStatus {
	if (!form.identityType || !form.id || !form.password) {
		return 'InvalidLogin';
	}

	return 'Ok';
}

export function validateRegister(form: RegisterForm): RegisterStatus {
	if (!form.identityType || !form.id || !form.email || !form.password) {
		return 'InvalidRegister';
	}

	return 'Ok';
}
