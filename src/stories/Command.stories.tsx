// ────────────────────────────────────────────────────────────────────────────────
// File: src/components/ui/command/command.stories.tsx
// Storybook v8 | React 19 | TypeScript | Tailwind CSS v4 | shadcn-ui v2.5
// Title: ShadcnUI/Command
// ────────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from 'react';

import { BookMarked, Heart, LayoutDashboard, Palette, Settings, Star } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react';

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from '@/components/ui/command';

/* -----------------------------------------------------------------------------
 * Storybook meta
 * ---------------------------------------------------------------------------*/
const meta: Meta<typeof Command> = {
	title: 'ShadcnUI/Command',
	component: Command,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component: `
A headless \`cmdk\` powered command palette.

This story file showcases the component in different scenarios and also provides
a fully-interactive **Playground** that you can tweak via controls or directly
inside the canvas.

• Feel free to press **⌘ + K** (macOS) or **Ctrl + K** (Windows / Linux) while
  focusing the iframe to open the palette in the Playground story.
        `,
			},
		},
	},
};

export default meta;
type Story = StoryObj<typeof Command>;

/* -----------------------------------------------------------------------------
 * Helpers
 * ---------------------------------------------------------------------------*/
function ExampleList() {
	return (
		<>
			<CommandInput placeholder="Type a command or search..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>

				<CommandGroup heading="Suggestions">
					<CommandItem>
						<LayoutDashboard className="size-4" />
						Dashboard
					</CommandItem>
					<CommandItem>
						<Heart className="size-4" />
						Favourites
						<CommandShortcut>⌘ F</CommandShortcut>
					</CommandItem>
				</CommandGroup>

				<CommandSeparator />

				<CommandGroup heading="Settings">
					<CommandItem>
						<Settings className="size-4" />
						Account
					</CommandItem>
					<CommandItem>
						<Star className="size-4" />
						Appearance
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</>
	);
}

/* -----------------------------------------------------------------------------
 * 1️⃣  Pure <Command> (inline)
 * ---------------------------------------------------------------------------*/
export const Inline: Story = {
	render: () => (
		<div className="w-full max-w-md rounded-lg border p-2 shadow-sm">
			<Command className="h-64">
				<ExampleList />
			</Command>
		</div>
	),
	name: 'Inline list',
	parameters: {
		docs: {
			description: {
				story:
					'The `Inline` story renders the `Command` component directly inside the page. ' +
					'Useful for autocomplete panels or query builders.',
			},
		},
	},
};

/* -----------------------------------------------------------------------------
 * 2️⃣  Grouped content
 * ---------------------------------------------------------------------------*/
export const WithGroups: Story = {
	render: () => (
		<div className="w-full max-w-md rounded-lg border p-2 shadow-sm">
			<Command className="h-64">
				<CommandInput placeholder="Try searching “themes”…" />
				<CommandList>
					<CommandEmpty>No results :(</CommandEmpty>

					<CommandGroup heading="Navigation">
						<CommandItem>
							<LayoutDashboard className="size-4" />
							Dashboard
							<CommandShortcut>G D</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<BookMarked className="size-4" />
							Docs
							<CommandShortcut>G I</CommandShortcut>
						</CommandItem>
					</CommandGroup>

					<CommandSeparator />

					<CommandGroup heading="Theme">
						{['Light', 'Dark', 'System'].map(theme => (
							<CommandItem key={theme}>
								<Palette className="size-4" />
								{theme}
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</Command>
		</div>
	),
	name: 'With groups & shortcuts',
	parameters: {
		docs: {
			description: {
				story: 'Demonstrates a more complex palette with groups, separators and keyboard shortcuts.',
			},
		},
	},
};

/* -----------------------------------------------------------------------------
 * 3️⃣  Dialog variant
 * ---------------------------------------------------------------------------*/
export const Dialog: Story = {
	render: () => {
		const [open, setOpen] = useState(true);

		return (
			<>
				<button onClick={() => setOpen(true)} className="rounded-md border bg-background px-4 py-2 text-sm shadow">
					Open Command ⌘K
				</button>

				<CommandDialog open={open} onOpenChange={setOpen}>
					<ExampleList />
				</CommandDialog>
			</>
		);
	},
	name: 'Dialog / Command palette',
	parameters: {
		docs: {
			description: {
				story:
					'The `CommandDialog` helper wraps the command list in a `Dialog` so ' +
					'it behaves like a global command palette.',
			},
		},
	},
};

/* -----------------------------------------------------------------------------
 * 4️⃣  Playground (interactive)
 * ---------------------------------------------------------------------------*/
export const Playground: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		/* Allow `⌘K` / `Ctrl+K` to toggle the palette */
		useEffect(() => {
			function handleKey(e: KeyboardEvent) {
				if (((e.metaKey && e.key.toLowerCase() === 'k') || (e.ctrlKey && e.key.toLowerCase() === 'k')) && !e.repeat) {
					e.preventDefault();
					setOpen(prev => !prev);
				}
			}
			window.addEventListener('keydown', handleKey);
			return () => window.removeEventListener('keydown', handleKey);
		}, []);

		return (
			<>
				<p className="mb-4 text-sm text-muted-foreground">
					Press <kbd className="rounded border px-1 text-xs">⌘</kbd> +
					<kbd className="rounded border px-1 text-xs">K</kbd> (or{' '}
					<kbd className="rounded border px-1 text-xs">Ctrl</kbd> +<kbd className="rounded border px-1 text-xs">K</kbd>)
					anywhere in the preview to open / close the palette.
				</p>

				<CommandDialog open={open} onOpenChange={setOpen}>
					<ExampleList />
				</CommandDialog>
			</>
		);
	},
	name: '⚡ Playground',
	parameters: {
		docs: {
			description: {
				story:
					'A fully-interactive playground with global hot-key support. Feel free to ' +
					'play with the controls panel or edit the source in **Storybook ↗︎ Show code**.',
			},
		},
	},
	// Setting 'playground' tag so Storybook highlights it as the default canvas in docs
	tags: ['playground'],
};
