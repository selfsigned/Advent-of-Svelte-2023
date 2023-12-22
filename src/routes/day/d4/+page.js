let pastHeartRates = [];

export async function load({ fetch, params }) {
	const api = 'https://advent.sveltesociety.dev/data/2023/day-four.json';
	const response = await fetch(api);
	const heartrate = await response.json();
	pastHeartRates.push(heartrate.heartRate);

	return {
		pastHeartRates: pastHeartRates,
		heartRate: heartrate.heartRate
	};
}
