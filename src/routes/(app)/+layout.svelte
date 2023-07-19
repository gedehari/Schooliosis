<script lang="ts">
    import { page } from "$app/stores";
    import { appRoutes, type AppRoutes } from "$lib/app/nav/types";

    $: currentRoute = $page.url.pathname.slice(1);
    $: title = appRoutes[currentRoute as AppRoutes].name;
</script>

<svelte:head>
    <title>{title} - Schooliosis</title>
</svelte:head>

<header>
    <div class="d-flex s-header">
        <div class="flex-fill s-header-name">Schooliosis</div>
        <img class="s-header-profile" src="/profile.png" height="42px" alt="" />
    </div>
    <div class="d-flex s-nav">
        {#each Object.entries(appRoutes) as [route, info] (route)}
            <div class="flex-fill s-nav-item {currentRoute == route ? 's-active' : ''}">
                <a href="/{route}">
                    <div>
                        <i class="bi {info.icon}"></i>
                        {info.name}
                    </div>
                </a>
            </div>
        {/each}
    </div>
</header>

<main>
    <slot />
</main>

<style>
    div.s-header {
        background-color: royalblue;
        color: white;
        padding: 10px 20px;
    }

    div.s-header > div.s-header-name {
        font-size: 1.5em;
        vertical-align: middle;
        margin: auto;
    }

    div.s-header > img.s-header-profile {
        border-radius: 50%;
        /* width: 100%; */
        max-height: 100%;
    }

    div.s-nav {
        text-align: center;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    }

    div.s-nav > .s-nav-item > a {
        color: black;
        text-decoration: none;
    }

    div.s-nav > .s-nav-item > a > div {
        padding: 4px 0;
    }

    div.s-nav > .s-nav-item > a > div > i.bi {
        display: block;
        font-size: 1.2em;
    }

    div.s-nav > .s-nav-item.s-active > a > div,
    div.s-nav > .s-nav-item > a:hover > div {
        background-color: rgb(219, 219, 219);
    }

    main {
        padding: 15px;
    }
</style>
