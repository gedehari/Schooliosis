<script lang="ts">
    import { page } from "$app/stores";
    import { topNavStrings } from "$lib/nav/types";
    import type { LayoutData } from "./$types";

    export let data: LayoutData;

    $: currentRoute = $page.url.pathname.slice(1);
</script>

<h1>Schooliosis</h1>

<h3>You are logged in as: {data.me?.name}</h3>
<p><a href="/logout">Logout</a></p>

<p>Route: {currentRoute}</p>

<nav>
    <ul>
        {#each Object.entries(topNavStrings) as [route, name]}
            {#if currentRoute == route}
                <li><b>{name}</b></li>
            {:else}
                <li><a href={`/${route}`}>{name}</a></li>
            {/if}
        {/each}
    </ul>
</nav>

<style>
    :global(body) {
        margin: 12px;
    }
</style>

<slot />
