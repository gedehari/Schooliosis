<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { subjects } = data;
</script>

<div class="box bg-white shadow">
	<table class="table">
		<thead>
			<tr>
				<th scope="col">Mata Pelajaran</th>
				<th scope="col">Tugas</th>
				<th scope="col">Kuis</th>
				<th scope="col">UTS</th>
				<th scope="col">UAS</th>
			</tr>
		</thead>
		<tbody>
			{#each subjects as subject (subject.id)}
				<tr>
					<td>{subject.mataPelajaran}</td>
					<td>{subject.nilai.find((value) => value.jenisNilai == 'Tugas')?.nilai || 0}</td>
					<td>{subject.nilai.find((value) => value.jenisNilai == 'Kuis')?.nilai || 0}</td>
					<td>{subject.nilai.find((value) => value.jenisNilai == 'UTS')?.nilai || 0}</td>
					<td>{subject.nilai.find((value) => value.jenisNilai == 'UAS')?.nilai || 0}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.box {
		display: block;
		/* width: fit-content; */
		max-width: 600px;
		margin: auto;
		padding: 20px;
		border-radius: 10px 10px 10px 10px;
	}
</style>
