<script lang="ts">
	import LinkContainer from '$lib/components/Containers/LinkContainer.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import ButtonContainer from '$lib/components/Containers/SignInUpButtonContainer.svelte';

	let headerLinks = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Contact', href: '/contact' }
	];
</script>

<div
	class="relative inline-flex h-30 w-full items-center justify-between self-stretch rounded-2xl px-20 py-2"
>
	<div
		class="inline-flex h-full w-full max-w-6xl items-center justify-between rounded-2xl bg-zinc-200 px-24"
	>
		<div class="inline-flex items-center justify-center gap-20">
			<Logo />
			<LinkContainer linkObjects={headerLinks} />
		</div>
		<ButtonContainer />
	</div>
</div>
