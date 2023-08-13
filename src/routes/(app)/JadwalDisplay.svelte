<script lang="ts">
	import type { Jadwal, JamPelajaran, MataPelajaran } from '@prisma/client';
	import { onMount } from 'svelte';

	const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

	export let schedulesPromise: Promise<
		(Jadwal & {
			// kelas: {
			//     tingkat: number;
			//     huruf: string;
			// }
			mataPelajaran: MataPelajaran | null;
			jamPelajaran: JamPelajaran;
		})[]
	>;

	$: isLoading = true;
	$: isError = false;

	let schedules: Awaited<typeof schedulesPromise> | undefined = undefined;
	onMount(() => {
		schedulesPromise
			.then((value) => {
				schedules = value;
				isLoading = false;
			})
			.catch((reason) => {
				isError = true;
			});
	});

	let selectedDay = 0;
	let daySchedule: Awaited<typeof schedulesPromise> | undefined;
	$: daySchedule = schedules ? schedules.filter((value) => value.hari == selectedDay) : undefined;
	$: daySchedule, console.log({ schedules });

	function second2time(second: number): string {
		const hours = Math.floor(second / 3600);
		const minutes = Math.floor((second - hours * 3600) / 60);
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
	}
</script>

<!-- TODO: add kelas display -->

<div class="box bg-white shadow">
	<div class="btn-group d-flex" role="group">
		{#each days as day, i (i)}
			<input
				type="radio"
				class="btn-check"
				name="btnradio"
				id="day{i}"
				value={i}
				autocomplete="off"
				checked={i == 0 ? true : false}
				bind:group={selectedDay}
				disabled={isLoading}
			/>
			<label class="btn btn-outline-primary" for="day{i}">{day}</label>
		{/each}
	</div>

	{#if isLoading}
		<table class="mt-1 table">
			<thead>
				<tr>
					<th scope="col">Jam Ke</th>
					<th scope="col">Waktu</th>
					<th scope="col">Pelajaran</th>
				</tr>
			</thead>
			<tbody>
				{#each [...Array(10).keys()] as i}
					<tr>
						<th scope="row"><span class="placeholder placeholder-wave col-1" /></th>
						<td><span class="placeholder placeholder-wave col-8" /></td>
						<td><span class="placeholder placeholder-wave col-12" /></td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else if daySchedule && daySchedule.length > 0}
		<table class="mt-1 table">
			<thead>
				<tr>
					<th scope="col">Jam Ke</th>
					<th scope="col">Waktu</th>
					<th scope="col">Pelajaran</th>
				</tr>
			</thead>
			<tbody>
				{#each daySchedule as schedule (schedule.id)}
					<tr>
						<th scope="row">{schedule.jamPelajaranId}</th>
						<td>{second2time(schedule.jamPelajaran.mulai)} - {second2time(schedule.jamPelajaran.selesai)}</td>
						<td>{schedule.jenisJadwal == 'Pembelajaran' ? schedule.mataPelajaran?.mataPelajaran : schedule.jenisJadwal}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<h3 class="mt-4 text-center">Tidak ada jadwal.</h3>
	{/if}
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
