<script lang="ts">
    import { browser } from "$app/environment";
    import FormInput from "$lib/form/FormInput.svelte";
    import { onMount } from "svelte";
    import voca from "voca";

    const LAST_IDENTITY_KEY = "__schooliosis_lastIdentity";

    export let type: "login" | "register" = "login";
    export let errorMessage: string | undefined = undefined;

    let identityType: string;

    onMount(() => {
        identityType = localStorage.getItem(LAST_IDENTITY_KEY) || "student";
    });

    function onIdentityChange() {
        localStorage.setItem(LAST_IDENTITY_KEY, identityType);
    }

    function onIdInputBlur() {
        if (type == "register") {
            window.alert("TODO: add identity checking...");
        }
    }

    function onSubmit() {
        window.alert("Boo!");
    }
</script>

<main class="{`form-signin w-100 m-auto ${browser ? 'visible' : 'invisible'}`}">
    <form method="post">
        <div class="btn-group d-flex mb-3" role="group">
            <input
                type="radio"
                class="btn-check"
                name="identityType"
                id="student"
                value="student"
                bind:group="{identityType}"
                on:change="{onIdentityChange}"
            />
            <label class="btn btn-outline-primary" for="student">Student</label>

            <input
                type="radio"
                class="btn-check"
                name="identityType"
                id="teacher"
                value="teacher"
                bind:group="{identityType}"
                on:change="{onIdentityChange}"
            />
            <label class="btn btn-outline-primary" for="teacher">Teacher</label>
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
            displayName="{identityType == 'teacher' ? 'NIK' : 'NIS'}"
            maxlength="{8}"
            on:blur="{onIdInputBlur}"
        />

        {#if type == "register"}
            <FormInput name="email" type="email" displayName="Email" />
        {/if}

        <FormInput name="password" type="password" displayName="Password" />

        {#if type == "register"}
            <FormInput
                name="confirmPassword"
                type="password"
                displayName="Confirm Password"
            />
        {/if}

        {#if type == "login"}
            <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" name="rememberMe" /> Ingat saya
                </label>
            </div>
        {/if}

        <button class="w-100 btn btn-lg btn-primary mb-3" type="submit"
            >{voca.titleCase(type)}</button
        >
    </form>

    {#if type == "login"}
        <p class="text-center">
            Belum memiliki akun? <a href="login/register">Register</a>
        </p>
    {:else}
        <p class="text-center">
            Sudah memiliki akun? <a href="../login">Login</a>
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
