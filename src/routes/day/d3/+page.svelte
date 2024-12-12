<script>
	import DayBaseLayout from '$lib/daybaselayout.svelte';
	let { data } = $props();

	const title = 'Jingle Bell Balancer';
	const maxWeight = 100; // max weight of sleigh

	// Presents logic
	let availablePresents = $state(data.presents);
	let sleighPresents = $state(new Map());
	function movePresent(src, dst, id) {
		console.log(src);
		dst.set(id, src.get(id));
		src.delete(id);
		console.log('moved:', src);
	}
	function sleighDragDrop(event) {
		let id = event.type == 'drop' ? event.dataTransfer.getData('text') : this.id;
		let data = availablePresents.get(id);

		if (data) {
			movePresent(availablePresents, sleighPresents, id);
			// update page values
			sleighPresents = new Map(sleighPresents);
			availablePresents = new Map(availablePresents);
		} else {
			console.log(`'${id}' doesn't match any available present`);
		}
	}
	function delPresentFromSleigh(id) {
		let data = sleighPresents.get(id);
		if (data) {
			movePresent(sleighPresents, availablePresents, id);
			// update page values
			sleighPresents = new Map(sleighPresents);
			availablePresents = new Map(availablePresents);
		}
	}
	// Weight calculation
	let sleighWeight = $derived(getPresentsSum(sleighPresents));
	let sleighPercentFull = $derived((sleighWeight / maxWeight) * 100);
	function getPresentsSum(presents) {
		let sum = 0;
		presents.forEach((present) => {
			sum += present.weight;
		});
		return sum;
	}
</script>

<DayBaseLayout {title}>
	<div class="stats shadow-xl">
		<div class="stat">
			<div class="stat-title">Sleigh Weight</div>
			<div class="stat-value {sleighWeight > maxWeight ? 'text-error' : ''}">
				{sleighWeight.toPrecision(3)}kg
			</div>
		</div>
		<div class="stat">
			<div class="radial-progress" style={`--value:${sleighPercentFull};`} role="progressbar">
				{Math.round(sleighPercentFull)}%
			</div>
		</div>
	</div>
	<div class="m-4 grid h-[80svh] grid-cols-2">
		<div>
			<h2 class="ml-2 text-2xl">Presents<span class="text-sm">(Drag or press)</span></h2>
			<div class="mb-10 flex flex-wrap content-start">
				{#each [...availablePresents] as [id, present]}
					{@const overweight = sleighWeight + present.weight > maxWeight}
					<!-- svelte-ignore a11y_unknown_role -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						{id}
						class="card m-1 h-28 w-40 bg-base-300 shadow-xl {overweight ? 'blur-[2px]' : ''}"
						draggable="true"
						ondragstart={(e) => (
							(e.dataTransfer.dropEffect = 'move'), e.dataTransfer.setData('text', id)
						)}
						onclick={sleighDragDrop}
						onkeypress={sleighDragDrop}
					>
						<div class="card-body">
							<h2 class="card-title">{present.name}</h2>
							{present.weight}kg
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="ml-2 h-[80svh]">
			<h2 class="text-2xl">Sleigh</h2>
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div
				class="mb-10 flex min-h-[50svh] flex-grow flex-wrap content-start border-2 border-base-content shadow-xl"
				ondragenter={(e) => e.preventDefault()}
				ondragover={(e) => e.preventDefault()}
				ondrop={sleighDragDrop}
			>
				{#each [...sleighPresents] as [id, present]}
					<div class="card m-1 h-28 w-36 bg-base-300">
						<div class="card-body">
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<btn
								class="btn btn-ghost absolute -ml-10 -mt-10"
								onclick={(e) => delPresentFromSleigh(id)}>🗑️</btn
							>
							<h2 class="card-title">{present.name}</h2>
							{present.weight}kg
						</div>
					</div>
				{/each}
				<div class></div>
			</div>
		</div>
	</div>
</DayBaseLayout>
