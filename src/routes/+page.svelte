<script>
	import { range } from '$lib/js/range.js';
	import { base } from '$app/paths';
	let { data } = $props();
</script>

<svelte:head>
	<title>Advent of Svelte 2023</title>
</svelte:head>

<div class="hero flex-1">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1
				class="text-bold bg-gradient-to-r from-primary via-secondary to-primary-content bg-clip-text text-5xl text-transparent"
			>
				Advent of Svelte 2023
			</h1>
			<h2
				class="text-bold bg-gradient-to-l from-primary via-secondary to-primary bg-clip-text text-xl text-transparent"
			>
				Continued in 2024!
			</h2>
			<p class="py-6">My solutions for Advent of Svelte 2023</p>
			<div class="flex flex-wrap items-center justify-center gap-4">
				{#each range(1, 24) as dayNbr}
					{#if dayNbr in data.available_days}
						<a href={data.available_days[dayNbr]}>
							<button
								class="btn btn-primary w-24 shadow-md shadow-primary-content hover:btn-secondary"
								>Day {dayNbr}</button
							>
						</a>
					{:else}
						<button class="btn btn-disabled w-24">Day {dayNbr}</button>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>
