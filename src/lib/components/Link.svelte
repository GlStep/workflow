<script lang="ts">
	let { linkAttribute } = $props();
	console.log(linkAttribute);
</script>

<div class="inline-flex h-4 items-center justify-center gap-3">
	<div class="font-robotoflex relative justify-start text-center text-xs font-normal">
		<a href={linkAttribute.href}>{linkAttribute.name}</a>
	</div>
</div>
