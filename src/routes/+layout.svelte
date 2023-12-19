<script>
	import '../app.css';
	import Navbar from '../lib/navbar.svelte';

	export let data;
</script>

<div class="flex h-screen flex-col bg-base-300 bg-gradient-to-b from-base-300 to-base-100">
	<div class="sticky w-full max-w-full">
		<Navbar prefix="Day " routes={data.available_days}></Navbar>
	</div>
	<slot />
</div>
