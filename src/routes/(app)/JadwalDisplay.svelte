<script lang="ts">
    import type { Jadwal, JamPelajaran, MataPelajaran } from "@prisma/client";

    export let schedules: (Jadwal & {
        kelas: {
            tingkat: number;
            huruf: string;
        };
        mataPelajaran: MataPelajaran | null;
        jamPelajaran: JamPelajaran;
    })[];

    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

    let selectedDay = 0;
    $: daySchedule = schedules.filter((value) => value.hari == selectedDay);

    function second2time(second: number): string {
        const hours = Math.floor(second / 3600);
        const minutes = Math.floor((second - hours * 3600) / 60);
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    }
</script>

<!-- TODO: add kelas display -->

<div class="box bg-white shadow">
    <div class="btn-group" role="group">
        {#each days as day, i (i)}
            <input
                type="radio"
                class="btn-check"
                name="btnradio"
                id="day{i}"
                value="{i}"
                autocomplete="off"
                checked="{i == 0 ? true : false}"
                bind:group="{selectedDay}"
            />
            <label class="btn btn-outline-primary" for="day{i}">{day}</label>
        {/each}
    </div>

    {#if daySchedule.length > 0}
        <table class="table">
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
                        <td>{schedule.jenisJadwal == "Pembelajaran" ? schedule.mataPelajaran?.mataPelajaran : schedule.jenisJadwal}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        <h3 class="mt-2">Tidak ada jadwal.</h3>
    {/if}
</div>

<style>
    .box {
        display: block;
        width: fit-content;
        margin: auto;
        padding: 20px;
        border-radius: 10px 10px 10px 10px;
    }
</style>
