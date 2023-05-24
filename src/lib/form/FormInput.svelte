<script lang="ts">
    import { onMount } from "svelte";

    export let name: string;
    export let type: string;
    export let value: string = "";
    export let placeholder: string = "";
    export let maxlength: number | null | undefined = undefined;
    export let displayName: string;

    $: floatingName = `floating${name}`;

    function handleInput(e: Event) {
        const target = e.target as HTMLInputElement;
        value = target.value;
    }

    function onBlur() {
        validate();
    }

    function validate() {
        
    }

    onMount(() => {
        
    })
</script>

<div class="mb-3">
    <div class="form-floating">
        <input
            class="form-control"
            {type}
            id="{floatingName}"
            {name}
            {placeholder}
            {maxlength}
            required
            on:input="{handleInput}"
            on:focus
            on:blur={onBlur}
            on:blur
            on:change
        />
        <label for="{floatingName}">{displayName}</label>
    </div>
</div>
