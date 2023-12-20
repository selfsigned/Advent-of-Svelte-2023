<script>
	import '../app.css';
	import { range } from '$lib/js/range.js';
	import { base } from '$app/paths';
	import Navbar from '../lib/navbar.svelte';

	export let data;

	const repoURL = 'https://github.com/selfsigned/Advent-of-Svelte-2023';
	const challengeURL = 'https://advent.sveltesociety.dev';

	let prefix = 'Days ';
	let routes = data.available_days;
</script>

<div class="drawer">
	<input id="menu-drawer" type="checkbox" class="drawer-toggle" />
	<!-- Content -->
	<div class="drawer-content">
		<div class="flex h-screen flex-col bg-base-300 bg-gradient-to-b from-base-300 to-base-100">
			<div class="sticky z-10 w-full max-w-full">
				<Navbar drawer="menu-drawer" {repoURL} {challengeURL}></Navbar>
			</div>
			<slot />
		</div>
	</div>
	<!-- Drawer -->
	<div class="drawer-side z-20">
		<label for="menu-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<!-- Sidebar content here -->
		<ul class="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
			<!-- Fu*k this bug-->
			{#if base != '.'}
				<li><a href={`${base}/`}>Home</a></li>
			{/if}
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
