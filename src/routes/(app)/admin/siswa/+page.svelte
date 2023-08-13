<script lang="ts">
	import PersonEdit from '../PersonEdit.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { daftarSiswa, daftarKelas } = data;
</script>

<PersonEdit identityType="Siswa" daftarIndividu={daftarSiswa} {daftarKelas} />
