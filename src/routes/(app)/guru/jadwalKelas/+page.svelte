<script lang="ts">
    import JadwalDisplay from "../../JadwalDisplay.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    const { schedules } = data;
</script>

{#if schedules == undefined}
    <h1>Anda bukan wali kelas.</h1>
{:else}
    <JadwalDisplay schedules={schedules} />
{/if}