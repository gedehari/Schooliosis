<script lang="ts">
	import JadwalDisplay from '../../JadwalDisplay.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let { schedules } = data.streamed;
</script>

<JadwalDisplay schedulesPromise={schedules} />
<!-- 
{#await schedules}
	<p>loading</p>
{:then value}
	<JadwalDisplay {schedules} />
	<p>yay</p>
{:catch error}
	<p>{error}</p>
{/await} -->
