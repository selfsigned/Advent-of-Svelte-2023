<script>
	import DayBaseLayout from '$lib/daybaselayout.svelte';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	export let data;

	const title = 'Heart of Christmas';
	const maxAvgHeartRate = 180;
	let percentage,
		avgHeartrate,
		avgHeartrate30s,
		avgHeartrate5min = 0;

	function percentageCalc(array, nbrOfsamples) {
		if (!nbrOfsamples) {
			return array.reduce((a, c) => a + c, 0) / array.length;
		} else if (nbrOfsamples <= array.length) {
			return array.slice(-nbrOfsamples).reduce((a, c) => a + c, 0) / nbrOfsamples;
		} else {
			return 0;
		}
	}

	$: percentage = (data.heartRate / maxAvgHeartRate) * 100;
	$: avgHeartrate = percentageCalc(data.pastHeartRates, 0);
	$: avgHeartrate30s = percentageCalc(data.pastHeartRates, 30);
	$: avgHeartrate5min = percentageCalc(data.pastHeartRates, 300);

	onMount(() => {
		// Poll API every second
		const interval = setInterval(() => {
			invalidateAll();
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	});
</script>

<DayBaseLayout {title}>
	<div class="stats stats-vertical shadow-xl">
		<div class="stat">
			<div class="stat-title">Current BPM</div>
			<div class="radial-progress text-red-600" style="--size:12rem; --value:{percentage}">
				{data.heartRate}bpm
			</div>
		</div>
		<div class="stat">
			<div class="stat-title">Avg BPM</div>
			<div class="stat-value">{Math.round(avgHeartrate)}</div>
		</div>
		<!-- Good case for a component here -->
		<div class="stat">
			<div class="stat-title">Avg BPM (30s)</div>
			<div class="stat-value">
				{#if avgHeartrate30s != 0}
					{Math.round(avgHeartrate30s)}
				{:else}
					TBD
				{/if}
			</div>
		</div>
		<div class="stat">
			<div class="stat-title">Avg BPM (5m)</div>
			<div class="stat-value">
				{#if avgHeartrate5min != 0}
					{Math.round(avgHeartrate5min)}
				{:else}
					TBD
				{/if}
			</div>
		</div>
	</div>
</DayBaseLayout>
