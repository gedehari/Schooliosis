<script lang="ts">
    import type { ActionData } from "./$types";
    import FormBox from "./FormBox.svelte";

    const errorMessages: {[key: string]: string} = {
        "invalidLogin": "NIM/NIK dan/atau password salah. Silahkan coba lagi.",
        "serverError": "Terdapat kesalahan teknis dalam server. Silahkan coba beberapa saat lagi."
    }

    export let form: ActionData;

    $: errorMessage = form ? errorMessages[form?.status] : undefined
</script>

<FormBox type="login" errorMessage={errorMessage} />
