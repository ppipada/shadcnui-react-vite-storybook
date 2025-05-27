import React from 'react';

import { Minus, Plus } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

/* -------------------------------------------------------------------------- */
/*                             ⬩  Meta configuration ⬩                       */
/* -------------------------------------------------------------------------- */

const meta = {
	title: 'ShadcnUI/Collapsible',
	component: Collapsible,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
**Collapsible** is a thin-styled wrapper around Radix UI’s \`Collapsible\`
primitive. It is perfect for hiding advanced settings, FAQs, “read-more”
sections or any content that benefits from progressive disclosure.

This file showcases three common usage patterns built with **shadcn 2.5** and
**React 19**.`,
			},
		},
	},
	argTypes: {
		/* Root-level props we care about when playing in Storybook */
		defaultOpen: {
			description: 'Whether the collapsible is open by default (uncontrolled variant).',
			control: 'boolean',
			table: { category: 'Root props' },
		},
		open: {
			description:
				'Controlled open state. When supplied the component becomes fully\ncontrolled and `onOpenChange` is required.',
			control: 'boolean',
			table: { category: 'Root props' },
		},
		onOpenChange: {
			description: 'Event handler fired when open state changes.',
			action: 'onOpenChange',
			table: { category: 'Root props' },
		},
	},
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/*                                Default story                               */
/* -------------------------------------------------------------------------- */

export const Default: Story = {
	render: args => (
		<Collapsible {...args}>
			<CollapsibleTrigger asChild>
				<Button variant="secondary" size="sm" className="inline-flex items-center gap-2">
					<Plus className="size-4" />
					Toggle
				</Button>
			</CollapsibleTrigger>

			<CollapsibleContent className="mt-2 text-sm text-muted-foreground">
				<p>
					Radix primitives are unstyled, accessible UI components for building high-quality design systems and web apps
					in React.
				</p>
			</CollapsibleContent>
		</Collapsible>
	),
	args: {
		defaultOpen: false,
	},
	parameters: {
		docs: {
			description: {
				story: 'Uncontrolled usage via **defaultOpen**. Click the button to reveal the content.',
			},
		},
	},
};

/* -------------------------------------------------------------------------- */
/*                               Controlled story                             */
/* -------------------------------------------------------------------------- */

export const Controlled: Story = {
	render: args => {
		const [open, setOpen] = React.useState(false);

		return (
			<>
				{/* External UI controlling the collapsible  */}
				<Button onClick={() => setOpen(prev => !prev)}>
					{open ? <Minus className="mr-2 size-4" /> : <Plus className="mr-2 size-4" />}
					{open ? 'Close All' : 'Open All'}
				</Button>

				<Collapsible {...args} open={open} onOpenChange={setOpen} className="mt-4">
					<CollapsibleTrigger asChild>
						<Button variant="ghost" size="sm" className="inline-flex items-center gap-2">
							{open ? <Minus className="size-4" /> : <Plus className="size-4" />}
							Controlled trigger
						</Button>
					</CollapsibleTrigger>

					<CollapsibleContent className="mt-2 text-sm text-muted-foreground">
						<ul className="list-disc pl-4">
							<li>Supports fully controlled&nbsp;open-state</li>
							<li>Integrates with external UI (button above)</li>
							<li>Built with React&nbsp;19</li>
						</ul>
					</CollapsibleContent>
				</Collapsible>
			</>
		);
	},
	parameters: {
		docs: {
			description: {
				story:
					'Here the open state is managed from the outside. Click the **Open / Close** button' +
					' to toggle the collapsible programmatically.',
			},
		},
	},
};

/* -------------------------------------------------------------------------- */
/*                               Playground story                             */
/* -------------------------------------------------------------------------- */

export const Playground: Story = {
	name: '⚡ Playground',
	render: args => (
		<Collapsible {...args}>
			<CollapsibleTrigger asChild>
				<Button variant="outline" size="sm">
					Build your own 🍭
				</Button>
			</CollapsibleTrigger>

			<CollapsibleContent className="mt-2 space-y-2 text-sm">
				<p className="font-medium">Try tweaking the props:</p>
				<ul className="list-inside list-square">
					<li>defaultOpen</li>
					<li>open</li>
					<li>onOpenChange</li>
				</ul>
			</CollapsibleContent>
		</Collapsible>
	),
	args: {
		defaultOpen: false,
		open: true,
	},
	parameters: {
		docs: {
			description: {
				story:
					'A fully interactive playground – use the **Controls** panel to adjust props and observe live behaviour.',
			},
		},
	},
};
