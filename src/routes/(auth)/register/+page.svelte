<script lang="ts">
	import { registerStrings, type RegisterStatus } from '$lib/auth/types';
	import FormBox from '../FormBox.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	const status = form?.status as RegisterStatus;

	$: errorMessage = form ? registerStrings[status] || 'FIXME' : undefined;
</script>

<svelte:head>
	<title>Register di Schooliosis</title>
</svelte:head>

{#if status == 'Ok'}
	<div class="success-box w-100 m-auto">
		<h3 class="text-center">Register berhasil!</h3>
		<p>Anda sekarang bisa login dengan NIM/NIK tadi.</p>
		<a class="w-100 btn btn-lg btn-primary mb-3" href="/login"> Ke Halaman Login </a>
	</div>
{:else}
	<FormBox type="register" {errorMessage} />
{/if}

<style>
	.success-box {
		background-color: white;
		border-radius: 10px;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
		max-width: 400px;
		padding: 20px;
	}
</style>
