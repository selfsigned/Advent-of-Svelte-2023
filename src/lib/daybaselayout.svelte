<script>
	export let title;
	export let customClasses = '';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="flex flex-col items-center align-middle {customClasses}">
	<h1 class="text-bold m-5 text-3xl lg:m-10 lg:text-5xl">{title}</h1>
	<slot />
</div>
