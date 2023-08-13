<script lang="ts">
	import PersonEdit from '../PersonEdit.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { daftarGuru, daftarKelas, daftarMataPelajaran } = data;
</script>

<PersonEdit identityType="Guru" daftarIndividu={daftarGuru} {daftarKelas} {daftarMataPelajaran} />
