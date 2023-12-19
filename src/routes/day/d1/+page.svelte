<script>
	export let data;

	let nameSearch = '';
	const origTally = data.tally;
	let tally = origTally;

	$: if (nameSearch.length > 0) {
		tally = origTally.filter((kid) => kid.name.toLowerCase().includes(nameSearch.toLowerCase()));
	} else {
		tally = origTally;
	}
</script>

<svelte:head>
	<title>Naughty or Nice</title>
</svelte:head>

<div class="flex h-[90svh] flex-grow flex-col">
	<div class="m-5 self-center">
		<h1 class="text-5xl">Naughty or Nice</h1>
	</div>
	<input
		class="input-bordered input-lg max-w-xs self-center"
		placeholder="Check if they've been naughty"
		type="text"
		bind:value={nameSearch}
	/>
	<div class="m-10 grow self-center overflow-x-auto">
		<div class="table">
			<thead>
				<tr>
					<th>Name</th>
					<th>Tally</th>
					<th>Nice</th>
				</tr>
			</thead>
			<tbody>
				{#each tally as kid}
					<tr>
						<th>{kid.name}</th>
						<th>{kid.tally}</th>
						{#if kid.tally > 0}
							<th class="badge badge-success">Nice</th>
						{:else}
							<th class="badge badge-error">Naughty</th>
						{/if}
					</tr>
				{/each}
			</tbody>
		</div>
	</div>
</div>
