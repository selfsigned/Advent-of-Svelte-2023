<script>
	import { range } from '$lib/js/range.js';

	export let routes;
	export let prefix = '';
	export let themeswitcher = true;
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
						<li><a href="/">Home</a></li>
						<li>
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
			<a href="/" class="btn btn-ghost text-lg">Advent of Svelte</a>
		</div>

		<div>
			{#if themeswitcher}
				<div class="dropdown mr-2">
					<div tabindex="0" role="button" class="btn btn-ghost">
						Theme
						<svg
							width="12px"
							height="12px"
							class="inline-block h-2 w-2 fill-current opacity-60"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 2048 2048"
							><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg
						>
					</div>
					<ul
						tabindex="0"
						class="dropdown-content z-[1] w-52 rounded-box bg-base-300 p-2 shadow-2xl"
					>
						<li>
							<input
								type="radio"
								name="theme-dropdown"
								class="theme-controller btn btn-ghost btn-sm btn-block justify-start"
								aria-label="Default"
								value="default"
							/>
						</li>
					</ul>
				</div>
			{/if}
		</div>
	</nav>
</div>
