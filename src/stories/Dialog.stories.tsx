import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { cn } from '@/lib/utils';

/* -----------------------------------------------------------------------------------------------------------------
 * Storybook Metadata
 * ----------------------------------------------------------------------------------------------------------------- */

const meta: Meta<typeof Dialog> = {
	title: 'ShadcnUI/Dialog',
	component: Dialog,
	argTypes: {
		defaultOpen: {
			type: 'boolean',
			description: 'Whether the dialog is open by default (uncontrolled component).',
			table: {
				category: 'Radix Dialog Root prop',
				type: { summary: 'boolean' },
				defaultValue: { summary: 'false' },
			},
			control: 'boolean',
		},
		modal: {
			type: 'boolean',
			description: '`false` makes the dialog non-modal (click outside allowed, no focus lock).',
			table: {
				category: 'Radix Dialog Root prop',
				type: { summary: 'boolean' },
				defaultValue: { summary: 'true' },
			},
			control: 'boolean',
		},
		open: {
			type: 'boolean',
			description: '(Controlled) The open state of the dialog – supply together with `onOpenChange`.',
			table: {
				category: 'Radix Dialog Root prop',
				type: { summary: 'boolean' },
			},
			control: 'boolean',
		},
	},
	parameters: {
		docs: {
			description: {
				component: `
Shadcn-UI flavoured Radix Dialog component.

All sub-components forward refs, respect **data-attributes** for state-based styling and come with sensible defaults.

💡 **Heads-up** – The root \`Dialog\` itself doesn’t render anything.  
It just provides context – always nest at least one \`DialogTrigger\` & \`DialogContent\`.
`,
			},
		},
	},
};
export default meta;

/* -----------------------------------------------------------------------------------------------------------------
 * Template Utils
 * ----------------------------------------------------------------------------------------------------------------- */

const ExampleContent: React.FC<React.PropsWithChildren> = ({ children }) => (
	<DialogContent className="sm:max-w-[425px]">
		<DialogHeader>
			<DialogTitle>Edit profile</DialogTitle>
			<DialogDescription>Make changes to your profile here. Click save when you’re done.</DialogDescription>
		</DialogHeader>
		<div className={cn('grid gap-4 py-4')}>
			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="name" className="text-right">
					Name
				</Label>
				<Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
			</div>
			<div className="grid grid-cols-4 items-center gap-4">
				<Label htmlFor="username" className="text-right">
					Username
				</Label>
				<Input id="username" defaultValue="@peduarte" className="col-span-3" />
			</div>
		</div>
		<DialogFooter>
			<DialogClose asChild>
				<Button variant="outline">Cancel</Button>
			</DialogClose>
			<Button type="submit">Save changes</Button>
		</DialogFooter>
	</DialogContent>
);

/* -----------------------------------------------------------------------------------------------------------------
 * Stories
 * ----------------------------------------------------------------------------------------------------------------- */

type Story = StoryObj<typeof meta>;

/**
 * Basic uncontrolled usage.
 */
export const Default: Story = {
	render: args => (
		<Dialog {...args}>
			<DialogTrigger asChild>
				<Button variant="outline">Open dialog</Button>
			</DialogTrigger>
			<ExampleContent />
		</Dialog>
	),
	parameters: {
		docs: {
			description: {
				story:
					'The dialog manages its own open state via `defaultOpen` (uncontrolled). ' +
					'It will mount the portal only when required.',
			},
		},
	},
};

/**
 * Dialog showing a purely textual confirmation footer.
 */
export const WithCustomFooter: Story = {
	render: () => (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Delete record</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your record and remove its data from our servers.
					</DialogDescription>
				</DialogHeader>

				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button variant="ghost">Cancel</Button>
					</DialogClose>
					<Button variant="destructive">Yes, delete</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	),
	parameters: {
		docs: {
			description: {
				story:
					'A typical **confirmation dialog**. ' +
					'Notice the footer is aligned left (`sm:justify-start`) while buttons keep stacking on mobile.',
			},
		},
	},
};

/**
 * Controlled open state – Story controls surface the `open` prop.
 */
export const Controlled: Story = {
	args: {
		open: true,
	},
	argTypes: {
		open: {
			control: 'boolean',
		},
	},
	render: ({ open }) => {
		const [isOpen, setIsOpen] = React.useState(open);

		React.useEffect(() => setIsOpen(open), [open]);

		return (
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button variant="outline">Toggle dialog (external)</Button>
				</DialogTrigger>
				<ExampleContent />
			</Dialog>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					'Use the **controls panel** to play with the `open` prop. ' +
					'The example shows how to *fully control* the Radix dialog from the outside.',
			},
		},
	},
};

/* -----------------------------------------------------------------------------------------------------------------
 * Playground
 * ----------------------------------------------------------------------------------------------------------------- */

export const Playground: Story = {
	render: args => (
		<Dialog {...args}>
			<DialogTrigger asChild>
				<Button variant="secondary">Open playground dialog</Button>
			</DialogTrigger>
			<ExampleContent />
		</Dialog>
	),
	parameters: {
		docs: {
			description: {
				story:
					'All relevant props are exposed as **Storybook controls** so you can fiddle with the component ' +
					'without touching the code.',
			},
		},
	},
};
