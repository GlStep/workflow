<script lang="ts">
	import LinkContainer from '$lib/components/LinkContainer.svelte';
	import Logo from '$lib/components/Logo.svelte';

	let headerLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Contact', href: '/contact' }
	];
</script>

<div class="relative inline-flex w-full items-center justify-between px-20">
	<Logo />
	<LinkContainer linkObjects={headerLinks} />
</div>
