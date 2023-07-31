<script lang="ts">
    import { loginStrings, type LoginStatus } from "$lib/auth/types";
    import FormInput from "$lib/form/FormInput.svelte";
    import type { ActionData } from "./$types";

    export let form: ActionData;

    const status = form?.status as LoginStatus;

    $: errorMessage = form
        ? loginStrings[status] || "FIXME"
        : undefined;
</script>

<main class="form-signin w-100 m-auto">
    <form method="post">
        <h3 class="text-center mb-3">Admin Login</h3>

        {#if errorMessage}
            <div class="alert alert-danger" role="alert">
                {errorMessage}
            </div>
        {/if}

        <FormInput name="email" type="email" displayName="Email" />
        <FormInput name="password" type="password" displayName="Password" />

        <button class="w-100 btn btn-lg btn-primary mb-3" type="submit">
            Login
        </button>
    </form>
</main>

<style>
    .form-signin {
        background-color: white;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        max-width: 400px;
        padding: 20px;
    }
</style>
