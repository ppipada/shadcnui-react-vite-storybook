import { AlertCircle, CheckCircle, Info, type LucideIcon, Terminal, XCircle } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { VariantProps } from 'class-variance-authority';

import { Alert, AlertDescription, AlertTitle, alertVariants } from '@/components/ui/alert';

/* -----------------------------------------------------------------------------
 * Types & helpers
 * ---------------------------------------------------------------------------*/
type AlertVariant = VariantProps<typeof alertVariants>['variant'];

interface BaseAlertProps {
	/** Visual style of the alert */
	variant?: AlertVariant;
	/** Heading text of the alert */
	title?: string;
	/** Body text of the alert */
	description?: string;
	/** Built-in icons. Choose "none" to hide. */
	icon?: keyof typeof iconMap | 'none';
}

/** Map a string key to a lucide-react icon component */
const iconMap = {
	terminal: Terminal,
	alert: AlertCircle,
	info: Info,
	success: CheckCircle,
	error: XCircle,
} satisfies Record<string, LucideIcon>;

/** Base wrapper – keeps the example isolated from the design-system */
const BaseAlert = ({
	variant = 'default',
	title = 'Heads up!',
	description = 'You can add components to your app using the CLI.',
	icon = 'terminal',
	...rest
}: BaseAlertProps) => {
	const Icon = icon !== 'none' ? (iconMap[icon] ?? Terminal) : undefined;

	return (
		<Alert variant={variant} data-testid="alert" {...rest}>
			{Icon && <Icon className="size-4 shrink-0" data-testid="icon" />}
			{title && <AlertTitle data-testid="title">{title}</AlertTitle>}
			{description && <AlertDescription data-testid="description">{description}</AlertDescription>}
		</Alert>
	);
};

/* -----------------------------------------------------------------------------
 * Meta
 * ---------------------------------------------------------------------------*/
const meta: Meta<BaseAlertProps> = {
	title: 'ShadcnUI/Alert',
	component: BaseAlert,
	tags: ['autodocs'],
	args: {
		variant: 'default',
		icon: 'terminal',
		title: 'Heads up!',
		description: 'You can add components to your app using the CLI.',
	},
	argTypes: {
		variant: {
			control: { type: 'select' },
			options: ['default', 'destructive'],
			description: 'Visual style of the alert.',
			table: { category: 'Style' },
		},
		icon: {
			control: { type: 'select' },
			options: [...Object.keys(iconMap), 'none'],
			description: 'Built-in icons. Choose **none** to hide.',
			table: { category: 'Content' },
		},
		title: {
			control: { type: 'text' },
			description: 'Heading text of the alert.',
			table: { category: 'Content' },
		},
		description: {
			control: { type: 'text' },
			description: 'Body text of the alert.',
			table: { category: 'Content' },
		},
	},
	parameters: {
		layout: 'centered',
		controls: { expanded: true },
		docs: {
			description: {
				component:
					'`Alert` is a lightweight wrapper around the shadcn/ui **Alert** primitive with a handful of sensible defaults and the ability to render a preset icon. Use it to communicate ephemeral, non-blocking information.',
			},
		},
	},
};
export default meta;

type Story = StoryObj<BaseAlertProps>;

/* -----------------------------------------------------------------------------
 * Playground
 * ---------------------------------------------------------------------------*/
export const Playground: Story = {
	name: '⚡ Playground',
	args: {},
	render: args => <BaseAlert {...args} />,
	parameters: {
		docs: {
			description: {
				story: 'Use the **Controls** panel to tweak every prop in real-time and see the alert update instantly.',
			},
		},
		chromatic: { disableSnapshot: true },
	},
};

/* -----------------------------------------------------------------------------
 * Feature stories (no controls)
 * ---------------------------------------------------------------------------*/

/** Default */
export const Default: Story = {
	name: 'Default',
	args: {},
	render: args => <BaseAlert {...args} />,
	play: async ({ canvasElement, args }) => {
		const c = within(canvasElement);
		await expect(c.getByTestId('alert')).toBeInTheDocument();
		await expect(c.getByTestId('icon')).toBeInTheDocument();
		await expect(c.getByTestId('title')).toHaveTextContent(args.title!);
		await expect(c.getByTestId('description')).toHaveTextContent(args.description!);
	},
	parameters: {
		docs: {
			description: {
				story:
					'The out-of-the-box alert. Use it whenever you need to draw the user’s attention without implying urgency.',
			},
		},
		controls: { disable: true },
	},
};

/** Destructive */
export const Destructive: Story = {
	name: 'Destructive',
	args: { variant: 'destructive', icon: 'alert', title: 'Uh-oh!' },
	render: args => <BaseAlert {...args} />,
	play: async ({ canvasElement }) => {
		const c = within(canvasElement);
		// The destructive variant should have a red color palette
		// You may want to check for a class or style, depending on your implementation
		await expect(c.getByTestId('alert').className).toMatch(/destructive/);
	},
	parameters: {
		docs: {
			description: {
				story:
					'Reserved for **critical** errors that block the user. The red colour palette indicates that immediate action is required.',
			},
		},
		controls: { disable: true },
	},
};

/** Success */
export const Success: Story = {
	name: 'Success',
	render: () => (
		<Alert
			className="bg-green-100 border-green-500 text-green-900 dark:bg-green-900/20 dark:text-green-200"
			data-testid="alert"
		>
			<CheckCircle className="size-4 shrink-0" data-testid="icon" />
			<AlertTitle data-testid="title">Great!</AlertTitle>
			<AlertDescription data-testid="description">Everything worked just fine.</AlertDescription>
		</Alert>
	),
	play: async ({ canvasElement }) => {
		const c = within(canvasElement);
		await expect(c.getByTestId('alert')).toHaveTextContent('Great!');
	},
	parameters: {
		docs: {
			description: {
				story: 'Green success state – perfect for positive feedback such as “data saved” notifications.',
			},
		},
		controls: { disable: true },
	},
};

/** Warning */
export const Warning: Story = {
	name: 'Warning',
	render: () => (
		<Alert
			className="bg-yellow-100 border-yellow-500 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-200"
			data-testid="alert"
		>
			<AlertCircle className="size-4 shrink-0" data-testid="icon" />
			<AlertTitle data-testid="title">Warning!</AlertTitle>
			<AlertDescription data-testid="description">
				Something might not be right – double-check your settings before proceeding.
			</AlertDescription>
		</Alert>
	),
	parameters: {
		docs: {
			description: {
				story: 'A soft warning that draws attention without the gravity of a destructive alert.',
			},
		},
		controls: { disable: true },
	},
};

/** No icon */
export const NoIcon: Story = {
	name: 'No icon',
	args: { icon: 'none' },
	render: args => <BaseAlert {...args} />,
	play: async ({ canvasElement }) => {
		const c = within(canvasElement);
		await expect(c.queryByTestId('icon')).not.toBeInTheDocument();
	},
	parameters: {
		docs: {
			description: {
				story: 'If an icon feels redundant you can remove it entirely by setting `icon="none"`.',
			},
		},
		controls: { disable: true },
	},
};

/** No title */
export const NoTitle: Story = {
	name: 'No title',
	args: { title: undefined },
	render: args => <BaseAlert {...args} />,
	parameters: {
		docs: {
			description: {
				story: 'Body-only alert – useful when the context is crystal clear elsewhere in the UI.',
			},
		},
		controls: { disable: true },
	},
};

/** With long description */
export const WithLongDescription: Story = {
	name: 'With long description',
	args: {
		description:
			'This is a **really long** description meant to showcase how the alert scales with multi-line content. ' +
			'It will automatically wrap and the layout stays intact thanks to CSS grid. ' +
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non urna euismod, vulputate nisl nec, maximus dui.',
	},
	render: args => <BaseAlert {...args} />,
	parameters: {
		docs: {
			description: {
				story: 'Demonstrates proper text-wrapping, vertical rhythm and spacing for longer prose.',
			},
		},
		controls: { disable: true },
	},
};
