<script lang="ts">
    import type { PageData } from "./$types";

    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

    export let data: PageData;
    const { schedules } = data;

    let curDay = 0;
    $: console.log(curDay);

    function second2time(second: number): string {
        const hours = Math.floor(second / 3600);
        const minutes = Math.floor((second - hours * 3600) / 60);
        return `${hours}:${minutes}`;
    }
</script>

<p>{curDay}</p>

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
            bind:group="{curDay}"
        />
        <label class="btn btn-outline-primary" for="day{i}">{day}</label>
    {/each}
</div>

<table class="table w-auto">
    <thead>
        <tr>
            <th scope="col">Jam Ke</th>
            <th scope="col">Waktu</th>
            <th scope="col">Pelajaran</th>
        </tr>
    </thead>
    <tbody>
        {#each schedules as schedule (schedule.id)}
            <tr>
                <th scope="row">{schedule.jamPelajaranId}</th>
                <td>{second2time(schedule.jamPelajaran.mulai)} - {second2time(schedule.jamPelajaran.selesai)}</td>
                <td>{schedule.jenisJadwal == "Pembelajaran" ? schedule.mataPelajaran?.mataPelajaran : schedule.jenisJadwal}</td>
            </tr>
        {/each}
    </tbody>
</table>
