import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import reactDom from 'eslint-plugin-react-dom';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactX from 'eslint-plugin-react-x';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{ ignores: ['dist', 'node_modules'] },
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			js.configs.recommended,
			...tseslint.configs.strictTypeChecked,
			...tseslint.configs.stylisticTypeChecked,
			...storybook.configs['flat/recommended'],
			eslintConfigPrettier,
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			'react-x': reactX,
			'react-dom': reactDom,
		},
		settings: { react: { version: 'detect' } },
		rules: {
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		},
		parserOptions: {
			project: ['./tsconfig.build.json', './tsconfig.storybook.json'],
			tsconfigRootDir: import.meta.dirname,
		},
	}
);
