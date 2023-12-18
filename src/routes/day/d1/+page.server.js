// pre-fetch the json when building the app
export const prerender = true;

export const load = async () => {
	const api = 'https://advent.sveltesociety.dev/data/2023/day-one.json';
	const response = await fetch(api);
	const tally = await response.json();

	return {
		tally: tally
	};
};
