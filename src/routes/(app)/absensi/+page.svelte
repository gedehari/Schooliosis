<script lang=ts>
    import { each } from "svelte/internal";
    import type { PageData } from "./$types";

    export let data: PageData;
    const { presences } = data;
</script>

{#if presences.length == 0}
    <p>Data presensi kosong.</p>
{:else}
<ul>
    {#each presences as presence (presence.id)}
        <li>Absen pada tanggal {presence.tanggal.toLocaleString("id")} berstatus {presence.statusAbsen}</li>
    {/each}
</ul>
{/if}