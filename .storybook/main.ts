import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(ts|tsx)'],
	staticDirs: ['../src/stories/assets'],
	addons: ['@storybook/addon-essentials', '@storybook/addon-onboarding', '@storybook/addon-interactions'],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
};
export default config;
