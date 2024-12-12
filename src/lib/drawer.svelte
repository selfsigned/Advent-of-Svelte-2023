<!-- body slot   == your body -->
<!-- drawer slot == drawer content -->

<script>
	let { drawerID, body, sidebar } = $props();
</script>

<div class="drawer">
	<input id={drawerID} type="checkbox" class="drawer-toggle" />
	<!-- Content -->
	<div class="drawer-content">
		{@render body?.()}
	</div>
	<!-- Drawer -->
	<div class="drawer-side z-20">
		<label for={drawerID} aria-label="close sidebar" class="drawer-overlay"></label>
		<!-- Sidebar content here -->
		{@render sidebar?.()}
	</div>
</div>
