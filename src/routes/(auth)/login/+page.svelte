<script lang="ts">
	import { loginStrings, type LoginStatus } from '$lib/auth/types';
	import type { ActionData } from './$types';
	import FormBox from '../FormBox.svelte';

	export let form: ActionData;

	const status = form?.status as LoginStatus;

	$: errorMessage = form ? loginStrings[status] || 'FIXME' : undefined;
</script>

<svelte:head>
	<title>Login ke Schooliosis</title>
</svelte:head>

<FormBox type="login" {errorMessage} />
