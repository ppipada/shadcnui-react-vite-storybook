import React from 'react';

import { ArrowRight, Bell } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { Button } from '@/components/ui/button';

/* ──────────────────────────────────────────────────────────────────────────
   META
   ──────────────────────────────────────────────────────────────────────── */

const meta: Meta<typeof Button> = {
	title: 'ShadcnUI/Button',
	component: Button,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
The **Button** component from **shadcn/ui**.

Built with **Radix UI's \`<Primitive.button>\`** and styled using **Tailwind CSS 4**.

### Variants
- \`default\` – Primary action  
- \`secondary\` – Low-emphasis action  
- \`destructive\` – Dangerous / irreversible action  
- \`ghost\` – Borderless, transparent background  
- \`link\` – Looks like an inline link  
- \`outline\` – Bordered button

### Sizes
- \`sm\` – Small (28 px height)  
- \`default\` – Medium (32 px height)  
- \`lg\` – Large (40 px height)  
- \`icon\` – Square button for icons (height = width)

The component forwards refs and supports **\`asChild\`** to render any element (e.g. Next.js \`<Link>\`) while inheriting styles.
        `.trim(),
			},
		},
	},
	argTypes: {
		variant: {
			description: 'Visual style of the button.',
			control: { type: 'select' },
			options: ['default', 'secondary', 'destructive', 'ghost', 'link', 'outline'],
			table: { defaultValue: { summary: 'default' } },
		},
		size: {
			description: 'Pre-defined size of the button.',
			control: { type: 'select' },
			options: ['default', 'sm', 'lg', 'icon'],
			table: { defaultValue: { summary: 'default' } },
		},
		disabled: {
			description: 'Whether the button is disabled.',
			control: { type: 'boolean' },
		},
		children: {
			description: 'Button label / content.',
			control: 'text',
		},
		asChild: {
			description: 'Render a different element (e.g. Next.js Link) while keeping button styles.',
			control: false,
		},
	},
	args: {
		variant: 'default',
		size: 'default',
		children: 'Button',
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

/* ──────────────────────────────────────────────────────────────────────────
   PLAYGROUND (ALL PROPS)
   ──────────────────────────────────────────────────────────────────────── */

export const Playground: Story = {
	name: '⚡ Playground',
	parameters: {
		docs: {
			description: {
				story: 'Interactive playground for experimenting with all props. Try different variants, sizes, and states.',
			},
		},
	},
	render: args => {
		const [label, setLabel] = React.useState(args.children ?? 'Click me');
		return (
			<Button
				{...args}
				onClick={args.disabled ? undefined : () => setLabel(prev => (prev === 'Clicked!' ? 'Click me' : 'Clicked!'))}
			>
				{label}
			</Button>
		);
	},
	play: async ({ canvasElement, args }) => {
		if (args.disabled) return;
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button');
		await userEvent.click(button);
		await expect(button).toHaveTextContent('Clicked!');
	},
};

/* ──────────────────────────────────────────────────────────────────────────
   VARIANT DEMOS (NO CONTROLS)
   ──────────────────────────────────────────────────────────────────────── */

export const Variants: Story = {
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'All visual variants of the Button.',
			},
		},
	},
	render: () => (
		<div className="flex flex-wrap gap-4">
			<Button variant="default">Default</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="destructive">Destructive</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="link">Link</Button>
			<Button variant="outline">Outline</Button>
		</div>
	),
};

/* ──────────────────────────────────────────────────────────────────────────
   SIZE DEMOS (NO CONTROLS)
   ──────────────────────────────────────────────────────────────────────── */

export const Sizes: Story = {
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'All size options for the Button.',
			},
		},
	},
	render: () => (
		<div className="flex flex-wrap gap-4 items-center">
			<Button size="sm">Small</Button>
			<Button size="default">Default</Button>
			<Button size="lg">Large</Button>
			<Button size="icon" aria-label="Notifications">
				<Bell className="w-4 h-4" />
			</Button>
		</div>
	),
};

/* ──────────────────────────────────────────────────────────────────────────
   DISABLED STATE
   ──────────────────────────────────────────────────────────────────────── */

export const Disabled: Story = {
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Buttons can be disabled via the native `disabled` attribute.',
			},
		},
	},
	render: () => (
		<div className="flex gap-4">
			<Button disabled>Disabled</Button>
			<Button variant="secondary" disabled>
				Disabled
			</Button>
			<Button variant="destructive" disabled>
				Disabled
			</Button>
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const buttons = canvas.getAllByRole('button');
		for (const btn of buttons) {
			await expect(btn).toBeDisabled();
		}
	},
};

/* ──────────────────────────────────────────────────────────────────────────
   ICON BUTTONS
   ──────────────────────────────────────────────────────────────────────── */

export const IconButtons: Story = {
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Buttons with icons, including icon-only and icon+label.',
			},
		},
	},
	render: () => (
		<div className="flex gap-4 items-center">
			<Button size="icon" aria-label="Notifications">
				<Bell className="w-4 h-4" />
			</Button>
			<Button variant="secondary" size="icon" aria-label="Next">
				<ArrowRight className="w-4 h-4" />
			</Button>
			<Button>
				<Bell className="w-4 h-4 mr-2" />
				Notify
			</Button>
			<Button variant="outline">
				Next
				<ArrowRight className="w-4 h-4 ml-2" />
			</Button>
		</div>
	),
};

/* ──────────────────────────────────────────────────────────────────────────
   AS CHILD (CUSTOM ELEMENT)
   ──────────────────────────────────────────────────────────────────────── */

export const AsChildLink: Story = {
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Using `asChild` to render a custom element (e.g. Next.js `<Link>`) while preserving button styles.',
			},
		},
	},
	render: () => (
		<Button asChild>
			<a href="https://example.com" target="_blank" rel="noopener noreferrer" data-testid="custom-link">
				Go to example.com <ArrowRight className="inline w-4 h-4 ml-1" />
			</a>
		</Button>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const link = canvas.getByTestId('custom-link');
		await expect(link).toHaveAttribute('href', 'https://example.com');
		await expect(link).toHaveTextContent('Go to example.com');
	},
};

/* ──────────────────────────────────────────────────────────────────────────
   INTERACTIVITY TESTS (PLAY FUNCTION)
   ──────────────────────────────────────────────────────────────────────── */

export const ClickTest: Story = {
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Button click updates label (component test via play function).',
			},
		},
	},
	render: args => {
		const [clicked, setClicked] = React.useState(false);
		return (
			<Button {...args} onClick={() => setClicked(true)}>
				{clicked ? 'Clicked!' : 'Click me'}
			</Button>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: 'Click me' });
		await userEvent.click(button);
		await expect(button).toHaveTextContent('Clicked!');
	},
};
