// pre-fetch the json when building the app
export const prerender = true;

export const load = async () => {
	const api = 'https://advent.sveltesociety.dev/data/2023/day-three.json';
	const response = await fetch(api);
	const presents = await response.json();

	let presentMap = new Map();
	presents.forEach((present) => {
		// Generate unique ID, 'good enough'
		presentMap.set(String(Math.random().toString(16).substring(2)), {
			name: present.name,
			weight: present.weight
		});
	});

	return {
		presents: presentMap
	};
};
