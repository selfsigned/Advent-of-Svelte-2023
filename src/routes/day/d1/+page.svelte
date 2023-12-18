<script>
	import { base } from '$app/paths';
	export let data;
</script>

<svelte:head>
	<title>Naughty or Nice</title>
</svelte:head>

<div class="flex max-h-screen flex-row">
	<div class="relative flex min-h-screen min-w-max flex-grow flex-col">
		<div class="m-5 self-center">
			<h1 class="text-5xl">Naughty or Nice</h1>
		</div>
		<div class="m-10 grow self-center overflow-x-auto">
			<div class="table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Tally</th>
					</tr>
				</thead>
				<tbody>
					{#each data.tally as kid}
						<tr>
							<th>{kid.name}</th>
							<th>{kid.tally}</th>
						</tr>
					{/each}
				</tbody>
			</div>
		</div>
	</div>
</div>
