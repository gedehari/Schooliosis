<script lang="ts">
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    import voca from "voca";

    const LAST_IDENTITY_KEY = "__schooliosis_lastIdentity";

    export let type: "login" | "register" = "login";

    let idType: string;

    onMount(() => {
        const value = localStorage.getItem(LAST_IDENTITY_KEY);
        if (value) {
            idType = value
        }
    });

    function onIdentityChange() {
        localStorage.setItem(LAST_IDENTITY_KEY, idType);
    }

    function onSubmit() {
        window.alert("Boo!");
    }
</script>

{#if browser}
    <div class="form-box">
        <h1>{voca.titleCase(`${idType} ${type}`)}</h1>
        <form method="post" on:submit|preventDefault={onSubmit}>
            <select name="identityType" bind:value={idType} on:change={onIdentityChange}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
            </select>

            <label for="id">{idType == "teacher" ? "NIK" : "NIS"}</label>
            <input type="text" name="id" placeholder="" required />

            {#if type == "register"}
                <label for="email">Email</label>
                <input type="email" name="email" placeholder="" />
            {/if}

            <label for="password">Password</label>
            <input type="password" name="password" placeholder="" required />

            {#if type == "register"}
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder="" required />
            {/if}

            <button type="submit">{voca.titleCase(type)}</button>
        </form>
    </div>
{/if}

<style>
    :global(.form-box) {
        max-width: 360px;
        margin: 20px auto;
        padding: 10px 15px;
        border-radius: 3px;
        background-color: white;
    }

    :global(.form-box h1) {
        text-align: center;
        margin: 5px 0;
    }

    :global(.form-box form label) {
        display: block;
        margin: 3px 0;
        font-size: 18px;
    }

    :global(.form-box form input) {
        display: block;
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 20px;
        padding: 7px;
        border: none;
        border: 1px solid gray;
        border-radius: 6px;
        outline: none;
    }

    :global(.form-box form button) {
        display: block;
        width: 100%;
        height: 35px;
        margin: 15px 0 10px 0;
        border: none;
        border-radius: 6px;
        background: linear-gradient(
            109.5deg,
            rgb(76, 221, 242) 11.2%,
            rgb(92, 121, 255) 91.1%
        );
        font-size: 18px;
        cursor: pointer;
    }

    :global(.form-box form button:hover) {
        background: linear-gradient(
            109.5deg,
            rgb(107, 225, 243) 11.2%,
            rgb(110, 136, 254) 91.1%
        );
    }
</style>
