<script>
	import ThemeSwitcher from './themeswitcher.svelte';
	import { range } from '$lib/js/range.js';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	const repoURL = 'https://github.com/selfsigned/Advent-of-Svelte-2023';
	const challengeURL = 'https://advent.sveltesociety.dev';

	export let routes;
	export let prefix = '';
	export let themeswitcher = true;
	let theme_support = false;

	onMount(async () => {
		if (browser) {
			theme_support = CSS.supports('selector(:has(*)');
		}
	});
</script>

<div class="navbar bg-base-100 bg-opacity-90 shadow-sm backdrop-blur transition-shadow">
	<nav class="navbar">
		<div class="flex-1">
			<div class="drawer w-auto">
				<input id="menu-drawer" type="checkbox" class="drawer-toggle" />
				<div class="drawer-content">
					<label for="menu-drawer" class="btn btn-ghost drawer-button">
						<!-- Sidebar Menu Content -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="inline-block h-5 w-5 stroke-current"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							></path></svg
						>
					</label>
				</div>
				<div class="drawer-side">
					<label for="menu-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
					<ul class="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
						<!-- Sidebar content here -->
						<li><a href="{base}/">Home</a></li>
						<li>
							<h2 class="menu-title">Web</h2>
							<ul>
								<li>
									<a target="_blank" rel="noopener" href={challengeURL}>Challenges</a>
								</li>
								<li>
									<a target="_blank" rel="noopener" href={repoURL}>Source code</a>
								</li>
							</ul>
							<h2 class="menu-title">Days</h2>
							<ul>
								{#each range(1, 24) as dayNbr}
									{#if dayNbr in routes}
										<li><a href={routes[dayNbr]}>{prefix}{dayNbr}</a></li>
									{/if}
								{/each}
							</ul>
						</li>
					</ul>
				</div>
			</div>
			<a href="{base}/" class="btn btn-ghost w-auto text-lg">
				<img class="w-10" src="{base}/favicon.png" alt="Advent of Svelte logo" />
				<span class="invisible sm:visible">Advent of Svelte</span>
			</a>
		</div>
		<div>
			<a
				target="_blank"
				rel="noopener"
				href={challengeURL}
				class="btn btn-ghost w-auto hover:rotate-90">WTF?</a
			>
			<a target="_blank" rel="noopener" href={repoURL} class="btn btn-ghost w-auto">
				<svg class="w-7 fill-base-content" viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg"
					><path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
					/></svg
				>
			</a>
			<!-- Mozilla sure took their time implementing :has() ... -->
			{#if themeswitcher && theme_support}
				<ThemeSwitcher></ThemeSwitcher>
			{/if}
		</div>
	</nav>
</div>
