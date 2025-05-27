import * as React from 'react';

import { X } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react';

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';

/* -------------------------------------------------------------------------- */
/*                                   Helper                                   */
/* -------------------------------------------------------------------------- */

export type DrawerDemoProps = {
	/**
	 * Edge of the screen the drawer should appear from.
	 * (Prop is forwarded to `vaul`’s `<Drawer.Root />`).
	 */
	direction?: 'top' | 'right' | 'bottom' | 'left';
	/** Text shown in `<DrawerTitle />` */
	title?: string;
	/** Text shown in `<DrawerDescription />` */
	description?: string;
	/** Render the “Close” button in the footer */
	showCloseButton?: boolean;
	/** Drawer body */
	children?: React.ReactNode;
};

/**
 * Re-usable helper that assembles a complete Drawer
 * so stories only have to focus on the interesting bits.
 */
const DrawerDemo: React.FC<DrawerDemoProps> = ({
	direction = 'bottom',
	title = 'Drawer title',
	description = 'Drawer description',
	showCloseButton = true,
	children,
}) => (
	<Drawer direction={direction}>
		<DrawerTrigger asChild>
			<button className="rounded-md bg-primary px-4 py-2 text-primary-foreground shadow">
				Open {direction} drawer
			</button>
		</DrawerTrigger>

		<DrawerContent>
			<DrawerHeader>
				<DrawerTitle>{title}</DrawerTitle>
				<DrawerDescription>{description}</DrawerDescription>
			</DrawerHeader>

			{/* ---------------- Main body ---------------- */}
			<div className="space-y-3 p-4">{children}</div>

			{/* ---------------- Footer ------------------- */}
			<DrawerFooter>
				{showCloseButton && (
					<DrawerClose asChild>
						<button className="inline-flex items-center gap-1 rounded-md bg-muted px-3 py-2 text-sm hover:bg-muted/70">
							<X size={14} />
							Close
						</button>
					</DrawerClose>
				)}
			</DrawerFooter>
		</DrawerContent>
	</Drawer>
);

/* -------------------------------------------------------------------------- */
/*                                     Meta                                  */
/* -------------------------------------------------------------------------- */

const meta = {
	title: 'ShadcnUI/Drawer',
	component: DrawerDemo,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
A fully–featured **Drawer** built on top of [vaul](https://vaul.dev)
and wrapped with shadcn-ui’s styling tokens.
        `,
			},
		},
	},
	argTypes: {
		direction: {
			control: { type: 'select' },
			options: ['top', 'right', 'bottom', 'left'],
			description: 'Screen edge the Drawer should slide in from.',
			table: { defaultValue: { summary: 'bottom' } },
		},
		title: { control: 'text', description: 'Headline shown in the drawer header.' },
		description: {
			control: 'text',
			description: 'Supporting copy rendered below the headline.',
		},
		showCloseButton: {
			control: 'boolean',
			name: 'Show close button',
			description: 'Toggle visibility of the footer close button.',
		},
	},
} satisfies Meta<typeof DrawerDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*                                   Stories                                  */
/* -------------------------------------------------------------------------- */

export const Default: Story = {
	name: 'Bottom (default)',
	args: { direction: 'bottom' },
};

export const Top: Story = {
	args: { direction: 'top' },
};

export const Left: Story = {
	args: { direction: 'left' },
};

export const Right: Story = {
	args: { direction: 'right' },
};

export const WithForm: Story = {
	name: 'With form',
	render: () => (
		<DrawerDemo direction="right" title="Update profile">
			<form
				className="flex w-72 flex-col gap-3"
				onSubmit={e => {
					e.preventDefault();
					// eslint-disable-next-line no-alert
					alert('Submitted ❗');
				}}
			>
				<label className="space-y-1 text-sm font-medium">
					<span>First name</span>
					<input
						className="ring-offset-background focus-visible:ring-ring placeholder:text-muted-foreground block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
						placeholder="Jane"
						required
					/>
				</label>

				<label className="space-y-1 text-sm font-medium">
					<span>Last name</span>
					<input
						className="ring-offset-background focus-visible:ring-ring placeholder:text-muted-foreground block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
						placeholder="Doe"
						required
					/>
				</label>

				<label className="space-y-1 text-sm font-medium">
					<span>E-mail</span>
					<input
						type="email"
						className="ring-offset-background focus-visible:ring-ring placeholder:text-muted-foreground block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
						placeholder="jane@acme.io"
						required
					/>
				</label>

				<DrawerFooter className="!mt-6 flex-row justify-end gap-2">
					<DrawerClose asChild>
						<button
							type="button"
							className="rounded-md border border-input bg-muted px-3 py-2 text-sm hover:bg-muted/70"
						>
							Cancel
						</button>
					</DrawerClose>
					<button
						type="submit"
						className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground shadow transition-colors hover:bg-primary/90"
					>
						Save
					</button>
				</DrawerFooter>
			</form>
		</DrawerDemo>
	),
	parameters: {
		docs: {
			story: {
				description: 'A whole form inside the drawer with submit handling.',
			},
		},
	},
};

/* ------------------------------- Playground ------------------------------ */

export const Playground: Story = {
	args: {
		direction: 'bottom',
		title: 'Playground',
		description: 'Tweak props via the controls panel.',
		showCloseButton: true,
	},
	render: args => (
		<DrawerDemo {...args}>
			<p className="text-sm leading-6">
				Use the <strong>controls</strong> panel on the right to play with the drawer’s props & behaviour.
			</p>
		</DrawerDemo>
	),
	parameters: {
		docs: {
			story: {
				description: 'Interactive playground powered by Storybook Controls. Adjust props and observe the live result.',
			},
		},
	},
};
