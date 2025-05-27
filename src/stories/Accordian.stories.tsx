import React from 'react';

import { ChevronDown, Lock } from 'lucide-react';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

/* ──────────────────────────────────────────────────────────────────────────
   META
   ──────────────────────────────────────────────────────────────────────── */

const meta: Meta<typeof Accordion> = {
	title: 'ShadcnUI/Accordion',
	component: Accordion,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
A wrapper around **Radix UI Accordion** re-implemented with **shadcn/ui** and styled with **Tailwind CSS 4**.

- \`type="single"\`   → only one panel open at a time (default)  
- \`type="multiple"\` → several panels can stay open at once

The component can be **uncontrolled** (via \`defaultValue\`) or **controlled** (pass \`value\` & \`onValueChange\`).

For accessibility every *AccordionTrigger* is rendered as a \`<button>\` controlling the visibility of its *AccordionContent*.
        `.trim(),
			},
		},
	},
	argTypes: {
		type: {
			description: 'Whether it behaves as a traditional single-open accordion or allows multiple items to stay open.',
			options: ['single', 'multiple'],
			control: { type: 'radio' },
			table: { defaultValue: { summary: 'single' } },
		},
		collapsible: {
			description: 'When **type="single"** this allows the currently open item to be collapsed by clicking it again.',
			control: { type: 'boolean' },
		},
		className: {
			description: 'Tailwind classes forwarded to the root `<Accordion>`.',
			control: 'text',
		},
		defaultValue: { control: false },
		value: { control: false },
		onValueChange: { control: false },
	},
	args: {
		type: 'single',
		className: 'w-80',
		onValueChange: action('value change'),
	},
};

export default meta;
type Story = StoryObj<typeof Accordion>;

/* ──────────────────────────────────────────────────────────────────────────
   PLAYGROUND  (all controls exposed)
   ──────────────────────────────────────────────────────────────────────── */

export const Playground: Story = {
	name: '⚡ Playground',
	render: args => (
		<Accordion {...args}>
			<AccordionItem value="item-1">
				<AccordionTrigger>Accordion</AccordionTrigger>
				<AccordionContent>
					<p className="text-sm">A vertically stacked set of interactive headings.</p>
				</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2">
				<AccordionTrigger>Second panel</AccordionTrigger>
				<AccordionContent>More content…</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
};

/* Helper to disable controls for feature stories */
const noControls = {
	controls: { disable: true, disableSaveFromUI: true },
} as const;

/* ──────────────────────────────────────────────────────────────────────────
   FEATURE STORIES  (no controls)
   ──────────────────────────────────────────────────────────────────────── */

export const Basic: Story = {
	parameters: {
		...noControls,
		docs: {
			description: {
				story: 'A minimal accordion with two items running in uncontrolled mode.',
			},
		},
	},
	render: args => (
		<Accordion {...args}>
			<AccordionItem value="item-1">
				<AccordionTrigger>What is shadcn/ui?</AccordionTrigger>
				<AccordionContent>A beautifully designed collection of Radix-powered components.</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2">
				<AccordionTrigger>Is it customisable?</AccordionTrigger>
				<AccordionContent>Yes – it’s just React & Tailwind.</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
};

export const WithIcons: Story = {
	parameters: {
		...noControls,
		docs: { description: { story: 'Trigger headings with leading icons.' } },
	},
	render: args => (
		<Accordion {...args}>
			<AccordionItem value="item-1">
				<AccordionTrigger>
					<ChevronDown className="mr-2 shrink-0" />
					Show details
				</AccordionTrigger>
				<AccordionContent>This row has a `ChevronDown` icon.</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2">
				<AccordionTrigger>
					<Lock className="mr-2 shrink-0" />
					Locked section
				</AccordionTrigger>
				<AccordionContent>Purely demonstrative.</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
};

export const WithDisabledItem: Story = {
	parameters: {
		...noControls,
		docs: {
			description: {
				story: 'Items can be disabled individually through the Radix `disabled` prop.',
			},
		},
	},
	render: args => (
		<Accordion {...args}>
			<AccordionItem value="item-1">
				<AccordionTrigger>Active item</AccordionTrigger>
				<AccordionContent>Clicks work here ✔️</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2" disabled>
				<AccordionTrigger>Disabled item (cannot open)</AccordionTrigger>
				<AccordionContent>You should never read this.</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
};

export const MultipleOpen: Story = {
	args: { type: 'multiple' },
	parameters: {
		...noControls,
		docs: {
			description: {
				story: 'When `type="multiple"` several panels can remain open at once.',
			},
		},
	},
	render: args => (
		<Accordion {...args}>
			{['One', 'Two', 'Three'].map((label, i) => (
				<AccordionItem key={label} value={`item-${i}`}>
					<AccordionTrigger>{label}</AccordionTrigger>
					<AccordionContent>All of these can be open simultaneously.</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	),
};

export const DefaultOpen: Story = {
	args: { defaultValue: 'item-1' },
	parameters: {
		...noControls,
		docs: {
			description: {
				story: '`defaultValue` pre-opens a panel on mount.',
			},
		},
	},
	render: args => (
		<Accordion {...args}>
			<AccordionItem value="item-1">
				<AccordionTrigger>Opened by default</AccordionTrigger>
				<AccordionContent>👋 Hello world.</AccordionContent>
			</AccordionItem>
			<AccordionItem value="item-2">
				<AccordionTrigger>Closed by default</AccordionTrigger>
				<AccordionContent>Hidden on initial render.</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
};

export const ControlledSingle: Story = {
	parameters: {
		...noControls,
		docs: { description: { story: 'Fully **controlled** accordion (single mode).' } },
	},
	render: ({ className }) => {
		const [value, setValue] = React.useState<string | undefined>('item-1');
		return (
			<>
				<p className="mb-2 text-sm text-muted-foreground">Current value: {JSON.stringify(value)}</p>
				<Accordion className={className} type="single" collapsible value={value} onValueChange={setValue}>
					<AccordionItem value="item-1">
						<AccordionTrigger>First</AccordionTrigger>
						<AccordionContent>First content</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>Second</AccordionTrigger>
						<AccordionContent>Second content</AccordionContent>
					</AccordionItem>
				</Accordion>
			</>
		);
	},
};

export const ControlledMultiple: Story = {
	parameters: {
		...noControls,
		docs: { description: { story: 'Controlled accordion in **multiple** mode.' } },
	},
	render: ({ className }) => {
		const [value, setValue] = React.useState<string[]>(['item-1']);
		return (
			<>
				<p className="mb-2 text-sm text-muted-foreground">Current value: {JSON.stringify(value)}</p>
				<Accordion className={className} type="multiple" value={value} onValueChange={setValue}>
					<AccordionItem value="item-1">
						<AccordionTrigger>First</AccordionTrigger>
						<AccordionContent>First content</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>Second</AccordionTrigger>
						<AccordionContent>Second content</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger>Third</AccordionTrigger>
						<AccordionContent>Third content</AccordionContent>
					</AccordionItem>
				</Accordion>
			</>
		);
	},
};

export const Nested: Story = {
	parameters: {
		...noControls,
		docs: {
			description: {
				story: 'Nested accordions. The inner accordion is fully independent.',
			},
		},
	},
	render: args => (
		<Accordion {...args}>
			<AccordionItem value="outer-1">
				<AccordionTrigger>Outer item</AccordionTrigger>
				<AccordionContent>
					<Accordion type="single" collapsible className="mt-2 w-full border-l pl-4">
						<AccordionItem value="inner-1">
							<AccordionTrigger>Inner item 1</AccordionTrigger>
							<AccordionContent>Nested content A</AccordionContent>
						</AccordionItem>
						<AccordionItem value="inner-2">
							<AccordionTrigger>Inner item 2</AccordionTrigger>
							<AccordionContent>Nested content B</AccordionContent>
						</AccordionItem>
					</Accordion>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
};

/* ──────────────────────────────────────────────────────────────────────────
   PLAY FUNCTION STORY  (component test)
   ──────────────────────────────────────────────────────────────────────── */

export const OpensOnClick: Story = {
	parameters: {
		controls: false,
		docs: {
			description: {
				story: 'UI test verifying that clicking the trigger opens the accordion.',
			},
		},
	},
	render: args => (
		<Accordion {...args}>
			<AccordionItem value="item-1">
				<AccordionTrigger data-testid="trigger">Accordion</AccordionTrigger>
				<AccordionContent data-testid="content">A vertically stacked set of interactive headings.</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
	play: async ({ canvasElement, step }) => {
		const canvas = within(canvasElement);
		const trigger = await canvas.findByTestId('trigger');
		await expect(trigger).toBeVisible();

		await step('Toggle accordion', async () => {
			await userEvent.click(trigger);
			const content = await canvas.findByTestId('content');
			await expect(content).toBeVisible();
		});
	},
};
