import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import type { DateRange } from 'react-day-picker';

import { Calendar } from '@/components/ui/calendar';

/* ────────────────────────────────────────────────────────────
   Storybook meta
   ──────────────────────────────────────────────────────────── */
const meta = {
	title: 'ShadcnUI/Calendar',
	component: Calendar,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
A fully-featured Calendar built on top of **react-day-picker** v9 and styled
with **shadcn-ui** & **Tailwind CSS v4**.

**Key features**
- \`single\`, \`range\`, \`multiple\` selection  
- Disabled days (static predicate or function)  
- Fully keyboard-accessible & locale-aware  
        `,
			},
		},
	},
	argTypes: {
		mode: {
			options: ['single', 'range', 'multiple'],
			control: { type: 'radio' },
			description: 'Selection mode.',
		},
		showOutsideDays: {
			control: 'boolean',
			description: 'Show days from previous/next month.',
		},
		/* We don’t expose the following through Controls */
		selected: { control: false, table: { disable: true } },
		onSelect: { control: false, table: { disable: true } },
		className: { control: false, table: { disable: true } },
		disabled: { control: false, table: { disable: true } },
	},
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ────────────────────────────────────────────────────────────
   Shared test helper
   ──────────────────────────────────────────────────────────── */
function getEnabledDayButtons(root: HTMLElement): HTMLButtonElement[] {
	/* `rdp-day` is the class used by react-day-picker for the day button */
	return Array.from(root.querySelectorAll<HTMLButtonElement>('button.rdp-day:not([disabled])'));
}

/* ────────────────────────────────────────────────────────────
   Playground – everything via Controls
   ──────────────────────────────────────────────────────────── */
export const Playground: Story = {
	name: '⚡ Playground',
	args: { mode: 'single', showOutsideDays: true, selected: undefined },
	render: (args, { updateArgs }) => (
		/* Cast to any so props can morph at runtime (single ↔ range ↔ multiple) */
		<Calendar
			{...(args as any)}
			onSelect={(value: any) => updateArgs({ selected: value } as any)}
			className="rounded-md border shadow"
		/>
	),
	parameters: {
		controls: { expanded: true },
		docs: {
			description: {
				story: 'Use the **Controls** panel to tweak every prop live.',
			},
		},
	},
};

/* ────────────────────────────────────────────────────────────
   Basic feature stories – controls disabled
   ──────────────────────────────────────────────────────────── */
export const Single: Story = {
	name: 'Single',
	render: () => {
		const [date, setDate] = useState<Date>();
		return (
			<Calendar mode="single" showOutsideDays selected={date} onSelect={setDate} className="rounded-md border shadow" />
		);
	},
	parameters: {
		controls: { disable: true },
		docs: { description: { story: 'Select **one** date.' } },
	},
};

export const Range: Story = {
	name: 'Range',
	render: () => {
		const [range, setRange] = useState<DateRange>();
		return (
			<div className="flex flex-col items-center gap-4">
				<Calendar
					mode="range"
					showOutsideDays
					selected={range}
					onSelect={setRange}
					className="rounded-md border shadow"
				/>
				<p className="text-sm">
					{range?.from ? range.from.toLocaleDateString() : 'from'} – {range?.to ? range.to.toLocaleDateString() : 'to'}
				</p>
			</div>
		);
	},
	parameters: {
		controls: { disable: true },
		docs: { description: { story: 'Pick a **start** and **end** date.' } },
	},
};

export const Multiple: Story = {
	name: 'Multiple',
	render: () => {
		const [days, setDays] = useState<Date[]>([]);
		return (
			<div className="flex flex-col items-center gap-4">
				<Calendar
					mode="multiple"
					showOutsideDays
					selected={days}
					onSelect={d => setDays(d ?? [])}
					className="rounded-md border shadow"
				/>
				<pre className="text-xs bg-muted rounded p-2 max-w-xs overflow-x-auto">{JSON.stringify(days, null, 2)}</pre>
			</div>
		);
	},
	parameters: {
		controls: { disable: true },
		docs: {
			description: { story: 'Choose **non-consecutive** days (e.g. availability).' },
		},
	},
};

export const WithDisabledDays: Story = {
	name: 'WithDisabledDays',
	render: () => {
		const [date, setDate] = useState<Date>();
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);

		return (
			<Calendar
				mode="single"
				showOutsideDays
				selected={date}
				onSelect={setDate}
				disabled={[
					{ dayOfWeek: [0, 6] }, // weekends
					{ before: yesterday }, // any day before yesterday
				]}
				className="rounded-md border shadow"
			/>
		);
	},
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Disables weekends **and** all dates before yesterday. Accepts an array of predicates.',
			},
		},
	},
};

export const CustomFirstDayOfWeek: Story = {
	name: 'CustomFirstDayOfWeek',
	render: () => {
		const [date, setDate] = useState<Date>();
		return (
			<Calendar
				mode="single"
				showOutsideDays
				weekStartsOn={1}
				selected={date}
				onSelect={setDate}
				className="rounded-md border shadow"
			/>
		);
	},
	parameters: {
		controls: { disable: true },
		docs: {
			description: { story: 'Calendar where the first day of week is **Monday**.' },
		},
	},
};

/* ────────────────────────────────────────────────────────────
   Play stories – interaction tests
   ──────────────────────────────────────────────────────────── */
export const SingleSelectionPlay: Story = {
	name: 'SingleSelectionPlay',
	render: () => {
		const [date, setDate] = useState<Date>();
		return (
			<Calendar
				mode="single"
				showOutsideDays
				selected={date}
				onSelect={setDate}
				className="rounded-md border shadow"
				data-testid="calendar-root"
			/>
		);
	},
	parameters: {
		controls: { disable: true },
		docs: { description: { story: 'Interaction test – single selection.' } },
	},
	play: async ({ canvasElement }) => {
		const { within, waitFor, userEvent, expect } = await import('@storybook/test');

		const canvas = within(canvasElement);
		const calendar = canvas.getByTestId('calendar-root');

		const [firstDay] = getEnabledDayButtons(calendar);
		await userEvent.click(firstDay);

		await waitFor(() => expect(calendar.querySelectorAll('button.rdp-day_selected').length).toBe(1));
	},
};

export const RangeSelectionPlay: Story = {
	name: 'RangeSelectionPlay',
	render: () => {
		const [range, setRange] = useState<DateRange>();
		return (
			<Calendar
				mode="range"
				showOutsideDays
				selected={range}
				onSelect={setRange}
				className="rounded-md border shadow"
				data-testid="calendar-root"
			/>
		);
	},
	parameters: {
		controls: { disable: true },
		docs: { description: { story: 'Interaction test – range selection.' } },
	},
	play: async ({ canvasElement }) => {
		const { within, waitFor, userEvent, expect } = await import('@storybook/test');

		const calendar = within(canvasElement).getByTestId('calendar-root');
		const days = getEnabledDayButtons(calendar);

		/* Click two distinct days */
		await userEvent.click(days[0]);
		await userEvent.click(days[days.length - 1]);

		await waitFor(() => expect(calendar.querySelectorAll('button.rdp-day_selected').length).toBeGreaterThanOrEqual(2));
	},
};

export const MultipleSelectionPlay: Story = {
	name: 'MultipleSelectionPlay',
	render: () => {
		const [days, setDays] = useState<Date[]>([]);
		return (
			<Calendar
				mode="multiple"
				showOutsideDays
				selected={days}
				onSelect={d => setDays(d ?? [])}
				className="rounded-md border shadow"
				data-testid="calendar-root"
			/>
		);
	},
	parameters: {
		controls: { disable: true },
		docs: { description: { story: 'Interaction test – multiple selection.' } },
	},
	play: async ({ canvasElement }) => {
		const { within, waitFor, userEvent, expect } = await import('@storybook/test');

		const calendar = within(canvasElement).getByTestId('calendar-root');
		const days = getEnabledDayButtons(calendar);

		/* Click first 3 enabled days */
		await userEvent.click(days[0]);
		await userEvent.click(days[1]);
		await userEvent.click(days[2]);

		await waitFor(() => expect(calendar.querySelectorAll('button.rdp-day_selected').length).toBeGreaterThanOrEqual(3));
	},
};
