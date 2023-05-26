<script lang="ts">
    import { registerStatus } from "$lib/status";
    import FormBox from "../FormBox.svelte";
    import type { ActionData } from "./$types";

    export let form: ActionData;

    $: errorMessage = form
        ? registerStatus[form?.status] || "FIXME"
        : undefined;
</script>

<FormBox type="register" errorMessage="{errorMessage}" />
