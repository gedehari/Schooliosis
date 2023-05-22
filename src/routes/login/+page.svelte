<script lang="ts">
    import FormBox from "./FormBox.svelte";
</script>

<FormBox title="Login">
    <label for="id">NIS</label>
    <input type="text" name="id" placeholder="" required />

    <label for="password">Password</label>
    <input type="password" name="password" placeholder="" required />

    <button type="submit">Submit</button>
</FormBox>

<p class="para-2">
    Tidak memiliki akun? <a href="/login/register">Register</a>
</p>
