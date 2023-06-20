<script lang="ts">
    import { onMount } from "svelte";
    import voca from "voca";
    import FormInput from "$lib/form/FormInput.svelte";

    const LAST_IDENTITY_KEY = "__schooliosis_lastIdentity";

    export let type: "login" | "register" = "login";
    export let errorMessage: string | undefined = undefined;

    let identityType: string;

    onMount(() => {
        identityType = localStorage.getItem(LAST_IDENTITY_KEY) || "Siswa";
    });

    function onIdentityChange() {
        localStorage.setItem(LAST_IDENTITY_KEY, identityType);
    }
</script>

<main class="form-signin w-100 m-auto">
    <form method="post">
        <div class="btn-group d-flex mb-3" role="group">
            <input
                type="radio"
                class="btn-check"
                name="identityType"
                id="Siswa"
                value="Siswa"
                bind:group="{identityType}"
                on:change="{onIdentityChange}"
                checked
            />
            <label class="btn btn-outline-primary" for="Siswa">Siswa</label>

            <input
                type="radio"
                class="btn-check"
                name="identityType"
                id="Guru"
                value="Guru"
                bind:group="{identityType}"
                on:change="{onIdentityChange}"
            />
            <label class="btn btn-outline-primary" for="Guru">Guru</label>
        </div>

        <h3 class="text-center mb-3">{voca.titleCase(type)}</h3>

        {#if errorMessage}
            <div class="alert alert-danger" role="alert">
                {errorMessage}
            </div>
        {/if}

        <FormInput
            name="id"
            type="text"
            displayName="{identityType == 'Guru' ? 'NIK' : 'NIS'}"
            maxlength="{8}"
        />

        {#if type == "register"}
            <FormInput name="email" type="email" displayName="Email" />
        {/if}

        <FormInput name="password" type="password" displayName="Password" />

        {#if type == "register"}
            <FormInput
                name="confirmPassword"
                type="password"
                displayName="Konfirmasi Password"
            />
        {/if}

        <!-- TODO: make remember me functional -->
        {#if type == "login"}
            <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" name="rememberMe" /> Ingat saya
                </label>
            </div>
        {/if}

        <button class="w-100 btn btn-lg btn-primary mb-3" type="submit">
            {voca.titleCase(type)}
        </button>
    </form>

    {#if type == "login"}
        <p class="text-center">
            Belum memiliki akun? <a href="/register">Register</a>
        </p>
    {:else}
        <p class="text-center">
            Sudah memiliki akun? <a href="/login">Login</a>
        </p>
    {/if}
</main>

<style>
    .form-signin {
        background-color: white;
        border-radius: 10px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
            rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        max-width: 400px;
        padding: 20px;
    }
</style>
