import { Fragment, useState } from 'react';

import { AlertTriangle, Trash2 } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, screen, userEvent, waitForElementToBeRemoved, within } from '@storybook/test';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

/* -------------------------------------------------------------------------- */
/* Meta                                                                       */
/* -------------------------------------------------------------------------- */
const meta: Meta = {
	title: 'ShadcnUI/AlertDialog',
	component: AlertDialogContent,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
**AlertDialog** interrupts the user and requests a decision.  
It is fully accessible and ships with sensible Tailwind styles.

- Use for critical confirmations (e.g. deleting data, irreversible actions).
- Composed of primitives: \`AlertDialog\`, \`AlertDialogTrigger\`, \`AlertDialogContent\`, etc.
- Supports controlled and uncontrolled usage.
- Fully keyboard accessible and focus-locked.
        `,
			},
		},
	},
	tags: ['autodocs'],
};
export default meta;

/* -------------------------------------------------------------------------- */
/* Internal helper                                                            */
/* -------------------------------------------------------------------------- */
interface DialogProps {
	title?: string;
	description?: string;
	actionLabel?: string;
	cancelLabel?: string;
	destructive?: boolean;
}

const BaseDialog = ({
	title = 'Are you absolutely sure?',
	description = `This action cannot be undone. This will permanently delete your account and remove your data from our servers.`,
	actionLabel = 'Continue',
	cancelLabel = 'Cancel',
	destructive = false,
}: DialogProps) => (
	<AlertDialog>
		<AlertDialogTrigger
			data-testid="trigger"
			data-destructive={destructive}
			className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/80 data-[destructive=true]:bg-destructive"
		>
			{destructive ? <Trash2 className="size-4" /> : <AlertTriangle className="size-4" />}
			Open dialog
		</AlertDialogTrigger>
		<AlertDialogContent className="max-w-lg" data-testid="content">
			<AlertDialogHeader>
				<AlertDialogTitle data-testid="title">{title}</AlertDialogTitle>
				<AlertDialogDescription data-testid="description">{description}</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel data-testid="cancel">{cancelLabel}</AlertDialogCancel>
				<AlertDialogAction
					data-testid="action"
					className={destructive ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : undefined}
				>
					{actionLabel}
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
);

const longLorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed fringilla erat. `.repeat(12);

/* -------------------------------------------------------------------------- */
/* 1. Playground                                                              */
/* -------------------------------------------------------------------------- */
type Story = StoryObj<DialogProps>;

export const Playground: Story = {
	name: '⚡ Playground',
	render: args => <BaseDialog {...args} />,
	args: {
		title: 'Are you absolutely sure?',
		description:
			'This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
		actionLabel: 'Continue',
		cancelLabel: 'Cancel',
		destructive: false,
	},
	argTypes: {
		title: { control: 'text' },
		description: { control: 'text' },
		actionLabel: { control: 'text' },
		cancelLabel: { control: 'text' },
		destructive: { control: 'boolean' },
	},
	parameters: {
		docs: {
			description: {
				story: `
Interactive playground – tweak the props in the **Controls** panel.

_Pro-tip:_ Use this story whenever you need to quickly preview a new copy deck or localisation string.
        `,
			},
		},
		controls: { expanded: true },
	},
};

/* -------------------------------------------------------------------------- */
/* 2. Default (non-destructive)                                               */
/* -------------------------------------------------------------------------- */
export const Default: Story = {
	render: args => <BaseDialog {...args} />,
	args: { destructive: false },
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'The default AlertDialog. Use it for neutral confirmations (e.g. “Save changes”).',
			},
		},
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// open
		await userEvent.click(canvas.getByTestId('trigger'));
		await expect(screen.getByTestId('title')).toBeInTheDocument();

		// close via “Cancel”
		await userEvent.click(screen.getByTestId('cancel'));
		await waitForElementToBeRemoved(() => screen.queryByTestId('title'));
	},
};

/* -------------------------------------------------------------------------- */
/* 3. Destructive                                                             */
/* -------------------------------------------------------------------------- */
export const Destructive: Story = {
	render: args => <BaseDialog {...args} />,
	args: {
		destructive: true,
		actionLabel: 'Delete account',
	},
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'A destructive variant with accent colours and iconography to emphasise the gravity of the action.',
			},
		},
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await userEvent.click(canvas.getByTestId('trigger'));
		const actionBtn = screen.getByTestId('action');
		expect(actionBtn).toHaveClass('bg-destructive');
		await userEvent.click(actionBtn);
		await waitForElementToBeRemoved(() => screen.queryByTestId('title'));
	},
};

/* -------------------------------------------------------------------------- */
/* 4. Scrollable content                                                      */
/* -------------------------------------------------------------------------- */
export const Scrollable: Story = {
	render: args => <BaseDialog {...args} />,
	args: {
		title: 'Please read the following carefully',
		description: longLorem,
		actionLabel: 'I have read everything',
		destructive: false,
	},
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: `
If the content exceeds the viewport height, AlertDialog automatically becomes scrollable while maintaining focus-lock and disabling background interaction.
        `,
			},
		},
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// open
		await userEvent.click(canvas.getByTestId('trigger'));
		await expect(screen.getByTestId('title')).toBeInTheDocument();

		// Check that the description is scrollable (has overflow)
		const content = screen.getByTestId('description');
		expect(content.scrollHeight).toBeGreaterThanOrEqual(content.clientHeight);

		// close via action
		await userEvent.click(screen.getByTestId('action'));
		await waitForElementToBeRemoved(() => screen.queryByTestId('title'));
	},
};

/* -------------------------------------------------------------------------- */
/* 5. Programmatic control (external state)                                   */
/* -------------------------------------------------------------------------- */
export const ControlledFromParent: StoryObj = {
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<Fragment>
				<button
					className="rounded bg-muted px-4 py-2 text-sm font-medium hover:bg-muted/70"
					onClick={() => setOpen(true)}
					data-testid="open-btn"
				>
					Open dialog from parent
				</button>

				<AlertDialog open={open} onOpenChange={setOpen}>
					{/* Hidden trigger keeps Radix happy for accessibility */}
					<AlertDialogTrigger asChild>
						<span />
					</AlertDialogTrigger>

					<AlertDialogContent className="max-w-lg" data-testid="content">
						<AlertDialogHeader>
							<AlertDialogTitle data-testid="title">Manual control</AlertDialogTitle>
							<AlertDialogDescription data-testid="description">
								The dialog’s <code>open</code> prop is controlled by the parent.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel data-testid="cancel" onClick={() => setOpen(false)}>
								Close
							</AlertDialogCancel>
							<AlertDialogAction data-testid="action" onClick={() => setOpen(false)}>
								Confirm
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</Fragment>
		);
	},
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: `
Demonstrates a **controlled** AlertDialog where the parent component holds and mutates the \`open\` state.  
This is useful for complex flows, dialogs opened from global stores, or integration with form libs.
        `,
			},
		},
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// open via external button
		await userEvent.click(canvas.getByTestId('open-btn'));
		await expect(screen.getByTestId('title')).toBeInTheDocument();

		// close via cancel
		await userEvent.click(screen.getByTestId('cancel'));
		await waitForElementToBeRemoved(() => screen.queryByTestId('title'));

		// open again and close via action
		await userEvent.click(canvas.getByTestId('open-btn'));
		await expect(screen.getByTestId('title')).toBeInTheDocument();
		await userEvent.click(screen.getByTestId('action'));
		await waitForElementToBeRemoved(() => screen.queryByTestId('title'));
	},
};
