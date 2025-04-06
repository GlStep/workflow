<script lang="ts">
	let { signInUpAttribute, variant } = $props();
	let textColor = $state();
	let bg = $state();

	if (variant === 'dark') {
		bg = 'bg-black';
		textColor = 'text-white';
	} else if (variant === 'light') {
		bg = 'bg-white';
		textColor = 'text-black';
	}
</script>

<a href={signInUpAttribute.href}>
	<button
		class="{bg} inline-flex items-center justify-center gap-2.5 rounded-lg px-6 py-2 outline-1 outline-black hover:cursor-pointer"
	>
		<div class="font-robotoflex text-center {textColor}">{signInUpAttribute.text}</div>
	</button>
</a>
