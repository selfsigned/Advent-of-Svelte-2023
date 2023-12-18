export const load = async () => {
	// Get available days and their paths
	const modules_days = import.meta.glob('./day/d*/+page.svelte');
	let days = {};
	Object.keys(modules_days).forEach((item) => {
		const day = item.match(/\d+/g)[0];
		if (day) {
			const path = item.replace('+page.svelte', '').replace('.', '');
			days[day] = path;
		}
	});

	return {
		days: days
	};
};
