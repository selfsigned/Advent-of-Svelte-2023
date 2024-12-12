<script>
	import { blur } from 'svelte/transition';
	import DayBaseLayout from '$lib/daybaselayout.svelte';
	const title = 'Misteltoe Metronome';

	let bpm = $state(0),
		taps = $state([]);

	function reset() {
		taps = [];
		bpm = 0;
	}

	function calculateBPM() {
		taps.push(Date.now());
		taps = taps;

		const averageMilliseconds =
			taps.reduce((acc, val, index, array) => {
				if (index != 0) {
					acc += val - array[index - 1];
				}
				return acc;
			}, 0) /
			(taps.length - 1);
		if (taps.length > 1) {
			bpm = Math.round(60000 / averageMilliseconds);
		}
	}
</script>

<DayBaseLayout {title}>
	<div class="flex w-full flex-col place-items-center sm:flex-row sm:justify-center">
		<btn
			class="btn btn-primary h-48 w-52 text-2xl"
			onclick={calculateBPM}
			onkeypress={calculateBPM}
			role="button"
			tabindex="0">PRESS ME</btn
		>
		<div class="divider sm:divider-horizontal">BPM</div>
		<div class="card h-48 w-52 place-items-center justify-center rounded-box bg-base-300">
			{#key bpm}
				<span transition:blur class=" absolute font-mono text-7xl">{bpm}</span>
			{/key}
		</div>
	</div>
	<btn class="btn mt-2 shadow-md" onclick={reset} onkeypress={reset} role="button" tabindex="0"
		>Reset</btn
	>
	<div class="mt-2 flex flex-row justify-center">
		&nbsp;
		{#each taps as tap}
			<p>♫</p>
		{/each}
	</div>
</DayBaseLayout>
