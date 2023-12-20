<script>
	import { fade } from 'svelte/transition';
	import DayBaseLayout from '$lib/daybaselayout.svelte';

	const title = 'Merry Munch-o-Meter';

	let cookieCount = 0;
	const addCookie = () => ++cookieCount;
	const decCookie = () => --cookieCount;
	const rstCookie = () => (cookieCount = 0);
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<DayBaseLayout {title}>
	<div class="stats shadow">
		<div class="stat place-items-start">
			<div class="stat-title">Cookies</div>
			<div class="stat-value">
				<div class="relative h-6">
					{#key cookieCount}
						<span class="absolute" transition:fade>{cookieCount}</span>
					{/key}
				</div>
			</div>
			<div class="stat-actions">
				<btn
					class="btn btn-sm"
					on:click={addCookie}
					on:keypress={addCookie}
					role="button"
					tabindex="0">+</btn
				>
				<btn
					class="btn btn-sm"
					on:click={decCookie}
					on:keypress={decCookie}
					role="button"
					tabindex="0">-</btn
				>
			</div>
		</div>
		<div class="stat w-32 place-items-center">
			<div class="stat-title">Santa</div>
			<div class="stat-value">🎅</div>
			<div class="stat-desc">Happy</div>
		</div>
	</div>
	<btn
		class="btn btn-sm mt-4 {cookieCount == 0 ? 'btn-disabled' : ''}"
		on:click={rstCookie}
		on:keypress={rstCookie}
		role="button"
		tabindex="0"
		>reset
	</btn>
</DayBaseLayout>
