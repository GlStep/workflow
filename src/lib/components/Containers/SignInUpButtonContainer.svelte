<script lang="ts">
	import SignInUpButton from '$lib/components/Buttons/SignInUpButton.svelte';
</script>

<div class="inline-flex items-center justify-center gap-7">
	<SignInUpButton signInUpAttribute={{ text: 'Sign In', href: '/auth/signin/' }} variant="light" />
	<SignInUpButton signInUpAttribute={{ text: 'Sign Up', href: '/auth/signup/' }} variant="dark" />
</div>
