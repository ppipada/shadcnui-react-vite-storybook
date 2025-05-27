import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		dts({
			include: ['src'],
			exclude: ['src/stories'],
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'ShadcnUI',
			fileName: format => `shadcnui.${format}.js`,
			formats: ['es', 'cjs'],
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
			},

			input: [path.resolve(__dirname, 'src/index.ts')],
		},
		cssCodeSplit: false,
	},
});
