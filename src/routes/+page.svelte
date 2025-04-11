<script lang="ts">
	import { enhance } from '$app/forms';

	import Header from '$lib/components/Header.svelte';
</script>

<Header />

<p>Example Page content</p>
<form method="post" use:enhance>
	<button>Sign Out</button>
</form>
<div class="h-2000"></div>
