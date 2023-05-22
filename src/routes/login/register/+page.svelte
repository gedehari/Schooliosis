<script lang="ts">
    import FormBox from "../FormBox.svelte";
</script>

<FormBox title="Register">
    <label for="id">NIS</label>
    <input type="text" name="id" placeholder="" />

    <label for="email">Email</label>
    <input type="email" name="email" placeholder="" />

    <label for="password">Password</label>
    <input type="password" name="password" placeholder="" />

    <label for="confirm-password">Confirm Password</label>
    <input type="password" placeholder="" />

    <button type="submit">Register</button>
</FormBox>

<p class="para-2">
    Sudah punya akun? <a href="/login">Login</a>
</p>
