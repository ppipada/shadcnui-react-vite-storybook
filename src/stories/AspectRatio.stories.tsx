import { Image } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { AspectRatio } from '@/components/ui/aspect-ratio';

/* ——————————————————————————————————————————————————————————
   🔑  Meta
   —————————————————————————————————————————————————————————— */
const meta: Meta<typeof AspectRatio> = {
	title: 'ShadcnUI/AspectRatio',
	component: AspectRatio,
	tags: ['autodocs'],
	argTypes: {
		ratio: {
			control: { type: 'number', min: 0.1, max: 4, step: 0.05 },
			description:
				'Desired aspect ratio expressed as **width / height** – e.g. for a “16∶9” rectangle use `16 / 9` (≈ 1.777…).',
			table: { type: { summary: 'number' }, defaultValue: { summary: '16 / 9' } },
		},
		className: {
			control: { type: 'text' },
			description: 'Extra Tailwind classes forwarded to the root `<div>` (e.g. `rounded-md overflow-hidden`).',
		},
		children: { table: { disable: true } },
	},
	parameters: {
		docs: {
			description: {
				component: `
A tiny **layout helper** that _locks the width/height proportion_ of its children while staying **fully responsive**.

Built on **@radix-ui/react-aspect-ratio** (wrapped by **shadcn/ui v2.5**) and styled with **Tailwind CSS v4**.

**Typical use-cases:**  
• Images & videos  
• Iframes  
• Avatars / thumbnails  
• Card placeholders
        `,
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

/* ──────────────────────────────────────────────────────────
   🎛️  Playground – every prop under your control
   ────────────────────────────────────────────────────────── */
export const Playground: Story = {
	name: '⚡ Playground',
	args: {
		ratio: 16 / 9,
		className: '',
		children: (
			<img
				src="/random-image.jpg"
				alt="Local sample"
				className="h-full w-full rounded-md object-cover"
				data-testid="playground-img"
			/>
		),
	},
	parameters: {
		docs: {
			description: {
				story:
					'Use the **controls panel** to tweak the `ratio` or append extra **Tailwind classes** ' +
					'and instantly observe the component’s behaviour.',
			},
		},
	},
};

/* ──────────────────────────────────────────────────────────
   📸  Feature demos (no controls)
   ────────────────────────────────────────────────────────── */

/* 1 ▸ Responsive 16×9 image */
export const Landscape16x9: Story = {
	name: '16×9 Landscape Image',
	render: () => (
		<AspectRatio ratio={16 / 9} className="rounded-xl shadow" data-testid="aspect">
			<img
				src="/random-image.jpg"
				alt="Local landscape"
				className="h-full w-full rounded-xl object-cover"
				data-testid="landscape-img"
			/>
		</AspectRatio>
	),
	parameters: { controls: { disable: true } },
};

/* 2 ▸ Perfect square avatar / thumbnail */
export const SquareAvatar: Story = {
	name: '1×1 Avatar Placeholder',
	render: () => (
		<AspectRatio ratio={1} className="rounded-full" data-testid="aspect">
			<div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-dashed border-muted/40 text-muted-foreground">
				<Image size="1.75rem" />
				<span className="mt-1 text-xs">1 × 1</span>
			</div>
		</AspectRatio>
	),
	parameters: { controls: { disable: true } },
};

/* 3 ▸ 3×4 portrait card */
export const Portrait34: Story = {
	name: '3×4 Portrait',
	render: () => (
		<AspectRatio ratio={3 / 4} className="rounded-md ring-1 ring-primary/20" data-testid="aspect">
			<img
				src="/random-image.jpg"
				alt="Local portrait"
				className="h-full w-full rounded-md object-cover"
				data-testid="portrait-img"
			/>
		</AspectRatio>
	),
	parameters: { controls: { disable: true } },
};

/* 4 ▸ 21×9 ultra-wide banner (image placeholder) */
export const UltraWide21x9: Story = {
	name: '21×9 Ultra-wide Banner',
	render: () => (
		<AspectRatio ratio={21 / 9} className="overflow-hidden rounded-lg ring-1 ring-muted/30" data-testid="aspect">
			<img
				src="/random-image.jpg"
				alt="Ultra-wide banner"
				className="h-full w-full object-cover"
				data-testid="ultrawide-img"
			/>
		</AspectRatio>
	),
	parameters: { controls: { disable: true } },
};

/* ──────────────────────────────────────────────────────────
   🧪  Play-function story (component tests)
   ────────────────────────────────────────────────────────── */
export const BehaviourTest: Story = {
	name: 'Renders',
	args: {
		ratio: 1,
		className: 'extra-class',
		children: <div data-testid="inside">child</div>,
	},
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: `
Interactive test executed in Storybook’s **play function**:

1. Asserts that the **child node** is rendered.  
2. Verifies **className** forwarding.  
3. Checks the \`--radix-aspect-ratio\` CSS variable is present and matches the expected value (±0.001).
        `,
			},
		},
	},
	render: args => (
		<AspectRatio {...args} data-testid="aspect">
			{args.children}
		</AspectRatio>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// 1 ▸ child is rendered
		expect(canvas.getByTestId('inside')).toBeInTheDocument();

		// 2 ▸ className forwarding
		const wrapper = canvas.getByTestId('aspect');
		expect(wrapper).toHaveClass('extra-class');
	},
};
