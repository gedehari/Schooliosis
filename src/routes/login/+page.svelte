<script lang="ts">
    import { loginStatus } from "$lib/status";
    import type { ActionData } from "./$types";
    import FormBox from "./FormBox.svelte";

    export let form: ActionData;

    $: errorMessage = form ? loginStatus[form?.status] || "FIXME" : undefined;
</script>

<FormBox type="login" errorMessage="{errorMessage}" />
