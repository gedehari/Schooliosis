<script lang="ts">
    import type { PageData } from "./$types";
    import BiodataDisplay from "../../BiodataDisplay.svelte";

    export let data: PageData;
    const { userInfo } = data;
</script>

<BiodataDisplay userInfo={userInfo} />
