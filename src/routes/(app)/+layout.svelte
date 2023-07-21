<script lang="ts">
    import { page } from "$app/stores";
    import { appRoutes, type RouteSection } from "./types";

    $: path = $page.url.pathname.slice(1).split("/");
    $: section = path[0] as RouteSection;
    $: sectionRoutes = appRoutes[section];

    $: currentRoute = path[1];
    $: title = sectionRoutes[currentRoute].name;
</script>

<svelte:head>
    <title>{title} - Schooliosis</title>
</svelte:head>

<header>
    <div class="s-header">
        <div class="container d-flex">
            <div class="flex-fill s-header-name">Schooliosis</div>
            <a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img class="s-header-profile" src="/profile.png" height="42px" alt="" />
            </a>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/logout">Logout</a></li>
            </ul>
        </div>
    </div>
    <div class="s-nav">
        <div class="container d-flex">
            {#each Object.entries(sectionRoutes) as [route, info] (route)}
                <div class="flex-fill s-nav-item {currentRoute == route ? 's-active' : ''}">
                    <a href="/{section}/{route}">
                        <div>
                            <i class="bi {info.icon}"></i>
                            {info.name}
                        </div>
                    </a>
                </div>
            {/each}
        </div>
    </div>
</header>

<main>
    <div class="container">
        <slot />
    </div>
</main>

<style>
    div.s-header {
        background-color: royalblue;
        color: white;
        padding: 10px 20px;
    }

    div.s-header > .container > div.s-header-name {
        font-size: 1.5em;
        vertical-align: middle;
        margin: auto;
    }

    div.s-header > .container > a > img.s-header-profile {
        border-radius: 50%;
        /* width: 100%; */
        max-height: 100%;
    }

    div.s-nav {
        text-align: center;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    }

    div.s-nav > .container > .s-nav-item > a {
        color: black;
        text-decoration: none;
    }

    div.s-nav > .container > .s-nav-item > a > div {
        padding: 4px 0;
    }

    div.s-nav > .container > .s-nav-item > a > div > i.bi {
        display: block;
        font-size: 1.2em;
    }

    div.s-nav > .container > .s-nav-item.s-active > a > div,
    div.s-nav > .container > .s-nav-item > a:hover > div {
        background-color: rgb(219, 219, 219);
    }

    main {
        padding: 25px;
    }
</style>
