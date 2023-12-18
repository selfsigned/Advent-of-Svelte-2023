<script>
	import { base } from '$app/paths';
	export let data;

	export function* range(start, end, step = 1) {
		for (let i = start; i <= end; i += step) {
			yield i;
		}
	}
</script>

<svelte:head>
	<title>Advent of Svelte 2023</title>
</svelte:head>

<div class="hero min-h-screen bg-gradient-to-b from-base-100 to-base-300">
	<div class="hero-content text-center">
		<div class="max-w-md">
			<h1 class="text-5xl">Advent of Svelte 2023</h1>
			<p class="py-6">My solutions to Advent of Svelte 2023</p>
			<div class="flex flex-wrap items-center justify-center gap-4">
				{#each range(1, 24) as dayNbr}
					{#if dayNbr in data.days}
						<a href={data.days[dayNbr]}>
							<button class="btn btn-primary w-20 shadow-md shadow-primary-content"
								>Day {dayNbr}</button
							>
						</a>
					{:else}
						<button class="btn btn-disabled w-20">Day {dayNbr}</button>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>
