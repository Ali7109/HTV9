/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				brownieStencil: ['"BrownieStencil-808MJ"', "sans-serif"],
			},
		},
		colors: {
			lightPurple: "#D0BCFF", // Vibrant Green
			darkPurple: "#65558F",
			accent: "#FFB74D", // Soft Amber/Orange
			background: "#F1F8E9", // Light Sage
			white: "#FFFFFF", // Pure White
			black: "#040005", // Soft Black/Charcoal
		},
	},
	plugins: [],
};
