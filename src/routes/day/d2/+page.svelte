<script lang="ts">
	import { fade } from 'svelte/transition';
	import DayBaseLayout from '$lib/daybaselayout.svelte';

	const title = 'Merry Munch-o-Meter';

	// Cookies
	let cookieCount = $state(0);
	const addCookie = () => ++cookieCount;
	const decCookie = () => --cookieCount;
	const rstCookie = () => (cookieCount = 0);
	//Santa
	const santaMoodDefault = { weight: 0, face: '🧑‍🎄', mood: 'Starving' };
	const santaMoods = [
		{ weight: 1337, face: '🤠', mood: 'Cookie magnate' },
		{ weight: 100, face: '👨‍💼', mood: 'CEO of Cookies' },
		{ weight: 42, face: '🧐', mood: 'Cookie expert' },
		{ weight: 15, face: '🤤', mood: 'Well fed' },
		{ weight: 2, face: '🎅', mood: 'Happy' },
		{ weight: -100, face: '💀', mood: 's̸͇͉̫̰̣̯͍̬̣̙̠̠̾͋̒͝ḳ̴̨̼̗̻̘̺̠̖̭̝̩͐͋̿͐͝ͅȅ̵̛̥̖̼̰̘̆͋̀̒̕l̴͎̬͎̪̥̐̇̈̈́̊̐̋̈́̚̚ͅe̷̢͈̖͚͗̃͜͝t̶̙̠̳̋̿ơ̸̧̛̥͈͈̞̞̖̬̗̍͆͋̋̿̑̈́͋͊͋̿̈́͜ņ̷̧̰̮̲̭̱̻̫̮̺̩̑̔̽̾̏͗̓̇̋͋́̾͌' },
		{ weight: -50, face: '🪦', mood: 'Dead' },
		{ weight: -30, face: '😭', mood: 'On the edge' },
		{ weight: -15, face: '😔', mood: 'Depressed' },
		{ weight: -5, face: '😢', mood: 'Sad' },
		{ weight: -2, face: '😟', mood: 'In debt' }
	];
	function getClosestMood(cookies: number) {
		for (const [key, value] of Object.entries(santaMoods)) {
			if (cookies < 0 && value.weight < 0 && cookies <= value.weight) {
				return santaMoods[key];
			} else if (cookies >= 0 && value.weight >= 0 && cookies >= value.weight) {
				return santaMoods[key];
			}
		}
		return santaMoodDefault; // fallback
	}

	// let santa = $state(santaMoods[0]);
	let santa = $derived(getClosestMood(cookieCount));
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
					onclick={addCookie}
					onkeypress={addCookie}
					role="button"
					tabindex="0">+</btn
				>
				<btn
					class="btn btn-sm"
					onclick={decCookie}
					onkeypress={decCookie}
					role="button"
					tabindex="0">-</btn
				>
			</div>
		</div>
		<div class="stat w-32 place-items-center">
			<div class="stat-title">Santa</div>
			<div class="stat-value">{santa.face}</div>
			<div class="stat-desc">{santa.mood}</div>
		</div>
	</div>
	<btn
		class="btn btn-sm mt-4 {cookieCount == 0 ? 'btn-disabled' : ''}"
		onclick={rstCookie}
		onkeypress={rstCookie}
		role="button"
		tabindex="0"
		>reset
	</btn>
	<class class="flex w-full flex-wrap overflow-auto p-4">
		{#each Array(Math.abs(cookieCount)) as _}
			<span in:fade out:fade class={cookieCount < 0 ? 'opacity-30' : 'opacity-100'}>🍪</span>
		{/each}
	</class>
</DayBaseLayout>
