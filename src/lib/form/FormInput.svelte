<script lang="ts">
	export let name: string;
	export let type: string;
	export let value = '';
	export let placeholder = '';
	export let maxlength: number | null | undefined = undefined;
	export let displayName: string;

	$: floatingName = `floating${name}`;

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		value = target.value;
	}
</script>

<div class="mb-3">
	<div class="form-floating">
		<input
			class="form-control"
			{type}
			id={floatingName}
			{name}
			{placeholder}
			{maxlength}
			required
			on:input={handleInput}
			on:focus
			on:blur
			on:change
		/>
		<label for={floatingName}>{displayName}</label>
	</div>
</div>
