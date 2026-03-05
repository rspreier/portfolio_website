/** @type {import('tailwindcss').Config} */
module.exports = {
		content: [
			'./src/pages/**/*.{js,jsx,ts,tsx,mdx}',
			'./src/components/**/*.{js,jsx,ts,tsx,mdx}',
			'./src/app/**/*.{js,jsx,ts,tsx,mdx}',
		],
		theme: {
			extend: {
				colors: {
					primary: {
						100: '#E9D8FD', // Light purple
						200: '#D6BCFA',
						300: '#B794F4',
						400: '#9F7AEA',
						500: '#805AD5', // Medium purple
						600: '#6B46C1',
						700: '#553C9A', // Dark purple
						800: '#44337A',
						900: '#322659',
					},
					dark: '#121212',
					light: '#F9FAFB',
				},
			},
		},
		plugins: [require('daisyui')],
		daisyui: {
			themes: [
				{
					mytheme: {
						primary: '#805AD5',
						secondary: '#553C9A',
						accent: '#9F7AEA',
						neutral: '#191D24',
						'base-100': '#F9FAFB',
						'base-200': '#E5E7EB',
						'base-300': '#D1D5DB',
					},
				},
			],
		},
	}