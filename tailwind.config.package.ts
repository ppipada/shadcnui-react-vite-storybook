import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{ts,tsx}'], // only scan lib source
	theme: { extend: {} },
	plugins: [],
} satisfies Config;
