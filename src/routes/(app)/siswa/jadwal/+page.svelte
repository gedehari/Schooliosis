<script lang="ts">
    import JadwalDisplay from "../../JadwalSiswaDisplay.svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    const { schedules } = data;
</script>

<JadwalDisplay schedules={schedules} />