/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [require('daisyui')],
	daisyui: {
		themes: ['nord', 'winter', 'forest', 'cyberpunk'],
		darkTheme: 'forest'
	}
};

module.exports = config;
