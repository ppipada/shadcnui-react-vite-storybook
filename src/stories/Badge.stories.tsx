import { useState } from 'react';

import { Check } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react';

import { Badge, badgeVariants } from '@/components/ui/badge';

/* -------------------------------------------------------------------------- */
/*                                    Meta                                    */
/* -------------------------------------------------------------------------- */

const meta: Meta<typeof Badge> = {
	title: 'ShadcnUI/Badge',
	component: Badge,
	tags: ['autodocs'],
	args: {
		variant: 'default',
		children: 'Badge',
	},
	argTypes: {
		variant: {
			description: 'Visual style of the badge',
			control: { type: 'radio' },
			options: ['default', 'secondary', 'outline', 'destructive'],
			table: { category: 'Style' },
		},
		children: {
			description: 'Badge content',
			control: 'text',
			table: { category: 'Content' },
		},
		asChild: { table: { disable: true } },
		className: { table: { disable: true } },
	},
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
**Badge** is used to highlight statuses, categories, or any short snippet of info.

\`\`\`tsx
import { Badge } from '@/components/ui/badge'

<Badge variant="secondary">New</Badge>
\`\`\`

- Use \`variant\` to control color and style.
- Composes well with icons and custom elements.
        `,
			},
		},
	},
	render: ({ children, ...rest }) => <Badge {...rest}>{children}</Badge>,
};

export default meta;

type Story = StoryObj<typeof Badge>;

/* -------------------------------------------------------------------------- */
/*                                   Stories                                  */
/* -------------------------------------------------------------------------- */

/* ------------------------------ Playground ------------------------------ */

export const Playground: Story = {
	name: '⚡ Playground',
	args: {
		variant: 'default',
		children: 'Playground',
	},
	parameters: {
		docs: {
			description: {
				story: 'Use the controls panel to play with `variant` and `children` props.',
			},
		},
	},
};

/* ------------------------------ Feature Demos ------------------------------ */

export const Default: Story = {
	name: 'Default',
	args: { variant: 'default', children: 'Default' },
	parameters: {
		controls: { disable: true },
		docs: { description: { story: 'Primary/brand badge for general use.' } },
	},
};

export const Secondary: Story = {
	name: 'Secondary',
	args: { variant: 'secondary', children: 'Secondary' },
	parameters: {
		controls: { disable: true },
		docs: { description: { story: 'Subtle neutral-toned badge.' } },
	},
};

export const Outline: Story = {
	name: 'Outline',
	args: { variant: 'outline', children: 'Outline' },
	parameters: {
		controls: { disable: true },
		docs: { description: { story: 'Transparent background with border.' } },
	},
};

export const Destructive: Story = {
	name: 'Destructive',
	args: { variant: 'destructive', children: 'Destructive' },
	parameters: {
		controls: { disable: true },
		docs: {
			description: { story: 'Use for dangerous or irreversible actions.' },
		},
	},
};

export const WithIcon: Story = {
	name: 'With Icon',
	render: ({ children, ...rest }) => (
		<Badge {...rest} className="inline-flex items-center gap-1.5">
			<Check className="size-3" /> {children}
		</Badge>
	),
	args: {
		variant: 'secondary',
		children: 'With Icon',
	},
	parameters: {
		controls: { disable: true },
		docs: {
			description: { story: 'Badges compose nicely with Lucide React icons.' },
		},
	},
};

export const LinkStyled: Story = {
	name: 'Link Styled Badge',
	render: ({ variant, children }) => (
		<a
			href="#"
			className={badgeVariants({ variant, className: 'cursor-pointer' })}
			tabIndex={0}
			aria-label="Badge as link"
		>
			{children}
		</a>
	),
	args: {
		variant: 'default',
		children: 'Anchor tag',
	},
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: '`badgeVariants` lets you apply Badge styles to arbitrary elements (e.g., anchor tags).',
			},
		},
	},
};

/* ----------------------------- Play Function Stories ----------------------------- */

export const InteractiveToggle: Story = {
	name: 'Interactive Toggle',
	args: {
		variant: 'default',
		children: 'Click to Toggle',
	},
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Demonstrates toggling badge variant on click.',
			},
		},
	},
	render: args => {
		// Use React 19 use hook
		const [active, setActive] = useState(false);
		return (
			<Badge
				variant={active ? 'destructive' : args.variant}
				className="cursor-pointer select-none"
				onClick={() => setActive(v => !v)}
				data-testid="toggle-badge"
			>
				{active ? 'Destructive' : args.children}
			</Badge>
		);
	},
	play: async ({ canvasElement }) => {
		const badge = canvasElement.querySelector('[data-testid="toggle-badge"]');
		if (!badge) throw new Error('Badge not found');
		// Simulate click
		badge.dispatchEvent(new MouseEvent('click', { bubbles: true }));
		// Wait for DOM update
		await new Promise(r => setTimeout(r, 100));
		// Check text content
		if (!badge.textContent?.includes('Destructive')) {
			throw new Error('Badge did not toggle to Destructive');
		}
	},
};
