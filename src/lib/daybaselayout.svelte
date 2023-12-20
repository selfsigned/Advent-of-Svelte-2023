<script>
	export let title;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="flex h-[90svh] flex-col items-center align-middle">
	<h1 class="text-bold m-5 text-3xl lg:m-10 lg:text-5xl">{title}</h1>
	<slot />
</div>
