<script lang="ts">
    export let title: string;
</script>

<div class="form-box">
    <h1>{title}</h1>
    <form method="post">
        <slot></slot>
    </form>
</div>

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
    }

    :global(.form-box form button:hover) {
        background: linear-gradient(
            109.5deg,
            rgb(107, 225, 243) 11.2%,
            rgb(110, 136, 254) 91.1%
        );
    }
</style>
