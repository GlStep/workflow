<script lang="ts">
	import Link from '$lib/components/Link.svelte';

	let { linkObjects } = $props();
</script>

<div class="inline-flex items-center justify-center gap-7 py-2">
	{#each linkObjects as linkObject}
		<Link linkAttribute={linkObject} />
	{/each}
</div>
