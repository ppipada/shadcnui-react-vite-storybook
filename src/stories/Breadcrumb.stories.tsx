// ShadcnUI/Breadcrumb.stories.tsx
import React from 'react';

import { ChevronRight } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

/* ────────────────────────────────────────────────────────────────────────── */
/*                                   META                                    */
/* ────────────────────────────────────────────────────────────────────────── */

const meta: Meta<typeof Breadcrumb> = {
	title: 'ShadcnUI/Breadcrumb',
	component: Breadcrumb,
	subcomponents: {
		BreadcrumbList,
		BreadcrumbItem,
		BreadcrumbLink,
		BreadcrumbSeparator,
		BreadcrumbEllipsis,
		BreadcrumbPage,
	},
	parameters: {
		layout: 'centered',
		controls: { expanded: true },
		docs: {
			description: {
				component: `
A **shadcn/ui**-compliant breadcrumb composed of atomic parts:

| Sub-component          | Role                                                                    |
| ---------------------- | ----------------------------------------------------------------------- |
| \`Breadcrumb\`          | Wrapper (\`<nav aria-label="breadcrumb">\`)                             |
| \`BreadcrumbList\`      | Ordered list (\`<ol>\`) for proper semantics                           |
| \`BreadcrumbItem\`      | List item (\`<li>\`)                                                    |
| \`BreadcrumbLink\`      | Clickable link with hover/focus states                                  |
| \`BreadcrumbPage\`      | Marks the current location (\`aria-current="page"\`)                   |
| \`BreadcrumbSeparator\` | Separator glyph (defaults to \`/\`)                                     |
| \`BreadcrumbEllipsis\`  | Optional overflow indicator                                            |

All styles are Tailwind 4 classes, so the breadcrumb automatically picks up your design-system tokens.

- **Playground**: Experiment with all props interactively.
- **Feature stories**: See common usage and prop combinations.
- **Play function stories**: Test interactivity and accessibility.

See Canvas for live demos.
        `,
			},
		},
	},
	tags: ['autodocs'],
};

export default meta;

/* ────────────────────────────────────────────────────────────────────────── */
/*                                 STORIES                                   */
/* ────────────────────────────────────────────────────────────────────────── */

/* 1. Playground (interactive, all props as controls) ─────────────────────── */

type PlaygroundArgs = {
	useIconSeparator: boolean;
	levels: number;
	ellipsisAfter?: number;
};

export const Playground: StoryObj<PlaygroundArgs> = {
	name: '⚡ Playground',
	args: {
		useIconSeparator: false,
		levels: 3,
		ellipsisAfter: undefined,
	},
	argTypes: {
		useIconSeparator: {
			description: 'Toggle between `/` and an icon as the separator',
			control: 'boolean',
		},
		levels: {
			description: 'Number of breadcrumb levels (2-6)',
			control: { type: 'range', min: 2, max: 6, step: 1 },
		},
		ellipsisAfter: {
			description: 'Show ellipsis after this index (1-based, optional)',
			control: { type: 'number', min: 2, max: 5, step: 1 },
		},
	},
	render: ({ useIconSeparator, levels, ellipsisAfter }) => {
		const items = Array.from({ length: levels }, (_, i) => `Level ${i + 1}`);
		return (
			<Breadcrumb>
				<BreadcrumbList>
					{items.map((label, idx) => {
						const isLast = idx === items.length - 1;
						const showEllipsis = ellipsisAfter && idx === ellipsisAfter - 1 && levels > (ellipsisAfter ?? 0) + 1;
						return (
							<React.Fragment key={label}>
								<BreadcrumbItem>
									{isLast ? (
										<BreadcrumbPage>{label}</BreadcrumbPage>
									) : (
										<BreadcrumbLink href="#">{label}</BreadcrumbLink>
									)}
								</BreadcrumbItem>
								{!isLast && (
									<>
										{showEllipsis ? (
											<>
												<BreadcrumbSeparator>
													{useIconSeparator ? <ChevronRight className="inline-block text-muted-foreground" /> : '/'}
												</BreadcrumbSeparator>
												<BreadcrumbEllipsis />
												<BreadcrumbSeparator>
													{useIconSeparator ? <ChevronRight className="inline-block text-muted-foreground" /> : '/'}
												</BreadcrumbSeparator>
											</>
										) : (
											<BreadcrumbSeparator>
												{useIconSeparator ? <ChevronRight className="inline-block text-muted-foreground" /> : '/'}
											</BreadcrumbSeparator>
										)}
									</>
								)}
							</React.Fragment>
						);
					})}
				</BreadcrumbList>
			</Breadcrumb>
		);
	},
	parameters: {
		docs: {
			description: {
				story: 'Experiment with all props: adjust levels, separator style, and optionally add an ellipsis.',
			},
		},
	},
};

/* 2. Feature: Basic usage ────────────────────────────────────────────────── */
export const Basic: StoryObj = {
	name: 'Basic',
	render: () => (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink href="/library">Library</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Data</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'A classic three-level breadcrumb with the current page disabled.',
			},
		},
	},
};

/* 3. Feature: With Ellipsis ──────────────────────────────────────────────── */
export const WithEllipsis: StoryObj = {
	name: 'With Ellipsis',
	render: () => (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink href="/library">Library</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbEllipsis />
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink href="/guides">Guides</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Use **`BreadcrumbEllipsis`** to collapse intermediate paths when horizontal space is scarce.',
			},
		},
	},
};

/* 4. Feature: Custom Separator (icon) ────────────────────────────────────── */
export const CustomSeparator: StoryObj = {
	name: 'Custom Separator',
	render: () => (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>
					<ChevronRight className="inline-block text-muted-foreground" />
				</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbLink href="/react">React</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>
					<ChevronRight className="inline-block text-muted-foreground" />
				</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Any React node can live inside **`BreadcrumbSeparator`**. Here we use `ChevronRight`.',
			},
		},
	},
};

/* 5. Play function: Keyboard navigation and accessibility ────────────────── */
export const KeyboardNavigation: StoryObj = {
	name: 'Keyboard Navigation (Play)',
	render: () => (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/" data-testid="home-link">
						Home
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink href="/library" data-testid="library-link">
						Library
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage data-testid="data-page">Data</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	),
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Tab through the breadcrumb links and ensure accessibility. The current page should not be tabbable.',
			},
		},
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		// Tab to first link
		await userEvent.tab();
		expect(canvas.getByTestId('home-link')).toHaveFocus();
		// Tab to second link
		await userEvent.tab();
		expect(canvas.getByTestId('library-link')).toHaveFocus();
		// Tab again: should NOT focus the page (not a link)
		await userEvent.tab();
		expect(canvas.queryByTestId('data-page')).not.toHaveFocus();
	},
};
