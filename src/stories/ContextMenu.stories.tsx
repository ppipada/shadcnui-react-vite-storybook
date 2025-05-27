import React, { useState } from 'react';

import {
    ClipboardIcon,
    CopyIcon,
    DeleteIcon,
    DownloadIcon,
    ExternalLinkIcon,
    FileIcon,
    FolderIcon,
    ScissorsIcon,
} from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react';

import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';

type Story = StoryObj<typeof meta>;

const meta: Meta = {
	title: 'ShadcnUI/ContextMenu',
	component: ContextMenu,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
A fully styled shadcn/ui ContextMenu powered by [@radix-ui/react-context-menu](https://www.radix-ui.com/primitives/docs/components/context-menu).

Right-click (or long-press on touch devices) on the **grey dashed area** in each story to open the menu.

Use \`data-slot\` attributes to hook into the DOM if you need end-to-end tests.

`,
			},
		},
	},
	argTypes: {
		// Expose only props that make sense in a playground
		disabled: { control: 'boolean' },
		modal: { control: 'boolean' },
	},
} as const;

export default meta;

// ---------------------------------------------------------------------
// Helper component used across stories
// ---------------------------------------------------------------------

/**
 * <DemoArea />
 *
 * A dashed area that we can right-click in.  The actual
 * ContextMenu trigger is spread across the entire area using
 * a wrapper <div> so users can't miss it.
 */
function DemoArea(props: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			{...props}
			className="flex h-56 w-full items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25 bg-muted/20 text-sm text-muted-foreground"
		>
			Right-click (context-menu) anywhere in this area
		</div>
	);
}

// ---------------------------------------------------------------------
// Story: Default
// ---------------------------------------------------------------------

export const Default: Story = {
	name: 'Default',
	render: args => (
		<ContextMenu {...args}>
			<ContextMenuTrigger asChild>
				<DemoArea />
			</ContextMenuTrigger>

			<ContextMenuContent>
				<ContextMenuItem>
					<CopyIcon /> Copy <ContextMenuShortcut>⌘C</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuItem>
					<ScissorsIcon /> Cut <ContextMenuShortcut>⌘X</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuItem>
					<ClipboardIcon /> Paste <ContextMenuShortcut>⌘V</ContextMenuShortcut>
				</ContextMenuItem>

				<ContextMenuSeparator />

				<ContextMenuSub>
					<ContextMenuSubTrigger inset>
						<FolderIcon /> More
					</ContextMenuSubTrigger>

					<ContextMenuSubContent>
						<ContextMenuItem>
							<DownloadIcon /> Download
						</ContextMenuItem>
						<ContextMenuItem>
							<ExternalLinkIcon /> Share link
						</ContextMenuItem>
					</ContextMenuSubContent>
				</ContextMenuSub>
			</ContextMenuContent>
		</ContextMenu>
	),
	parameters: {
		docs: {
			description: {
				story: 'A basic contextual menu with a sub-menu and shortcuts. **Right-click inside the dashed area**.',
			},
		},
	},
};

// ---------------------------------------------------------------------
// Story: Checkbox items
// ---------------------------------------------------------------------

export const CheckboxItems: Story = {
	name: 'Checkbox items',
	render: () => {
		const [bookmarksChecked, setBookmarksChecked] = useState(true);
		const [urlsChecked, setUrlsChecked] = useState(false);

		return (
			<ContextMenu>
				<ContextMenuTrigger asChild>
					<DemoArea />
				</ContextMenuTrigger>

				<ContextMenuContent>
					<ContextMenuLabel inset>View</ContextMenuLabel>
					<ContextMenuCheckboxItem checked={bookmarksChecked} onCheckedChange={setBookmarksChecked}>
						Bookmarks
					</ContextMenuCheckboxItem>
					<ContextMenuCheckboxItem checked={urlsChecked} onCheckedChange={setUrlsChecked}>
						Full URLs
					</ContextMenuCheckboxItem>
					<ContextMenuSeparator />
					<ContextMenuItem>
						<FileIcon /> New file
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
		);
	},
	parameters: {
		docs: {
			description: {
				story: 'Checkbox items keep local state inside the story so you can toggle them.',
			},
		},
	},
};

// ---------------------------------------------------------------------
// Story: Radio group
// ---------------------------------------------------------------------

export const RadioGroup: Story = {
	name: 'Radio group',
	render: () => {
		const [position, setPosition] = useState<'top' | 'bottom' | 'right'>('bottom');

		return (
			<ContextMenu>
				<ContextMenuTrigger asChild>
					<DemoArea />
				</ContextMenuTrigger>

				<ContextMenuContent>
					<ContextMenuRadioGroup value={position} onValueChange={val => setPosition(val as 'top' | 'bottom' | 'right')}>
						<ContextMenuLabel inset>Panel position</ContextMenuLabel>
						<ContextMenuRadioItem value="top">Top</ContextMenuRadioItem>
						<ContextMenuRadioItem value="bottom">Bottom</ContextMenuRadioItem>
						<ContextMenuRadioItem value="right">Right</ContextMenuRadioItem>
					</ContextMenuRadioGroup>
				</ContextMenuContent>
			</ContextMenu>
		);
	},
	parameters: {
		docs: {
			description: {
				story: 'Radio items behave like a traditional radio group — exactly one can be selected at a time.',
			},
		},
	},
};

// ---------------------------------------------------------------------
// Story: Sub-menu
// ---------------------------------------------------------------------

export const SubMenu: Story = {
	name: 'Sub-menu',
	render: () => (
		<ContextMenu>
			<ContextMenuTrigger asChild>
				<DemoArea />
			</ContextMenuTrigger>

			<ContextMenuContent>
				<ContextMenuItem>
					<CopyIcon /> Copy
				</ContextMenuItem>
				<ContextMenuSub>
					<ContextMenuSubTrigger>
						<FolderIcon /> More options
					</ContextMenuSubTrigger>
					<ContextMenuSubContent>
						<ContextMenuItem>
							<DownloadIcon /> Download
						</ContextMenuItem>
						<ContextMenuItem>
							<ExternalLinkIcon /> Share link
						</ContextMenuItem>
					</ContextMenuSubContent>
				</ContextMenuSub>
			</ContextMenuContent>
		</ContextMenu>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Nested context menus are supported using `ContextMenuSub`, `ContextMenuSubTrigger` & `ContextMenuSubContent`.',
			},
		},
	},
};

// ---------------------------------------------------------------------
// Story: Destructive / disabled
// ---------------------------------------------------------------------

export const Destructive: Story = {
	name: 'Destructive + disabled',
	render: () => (
		<ContextMenu>
			<ContextMenuTrigger asChild>
				<DemoArea />
			</ContextMenuTrigger>

			<ContextMenuContent>
				<ContextMenuItem>
					<CopyIcon /> Copy
				</ContextMenuItem>
				<ContextMenuItem disabled>
					<ScissorsIcon /> Cut (disabled)
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem variant="destructive">
					<DeleteIcon /> Delete permanently
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use `variant="destructive"` or `disabled` to alter style & behaviour.',
			},
		},
	},
};

// ---------------------------------------------------------------------
// Story: Playground
// ---------------------------------------------------------------------

export const Playground: Story = {
	name: '⚡ Playground',
	args: {
		modal: false,
		disabled: false,
	},
	render: ({ modal }) => (
		<ContextMenu modal={modal}>
			<ContextMenuTrigger asChild>
				<DemoArea className="cursor-context-menu" />
			</ContextMenuTrigger>

			<ContextMenuContent>
				<ContextMenuGroup>
					<ContextMenuItem>
						<CopyIcon /> Copy <ContextMenuShortcut>⌘C</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuItem>
						<ScissorsIcon /> Cut <ContextMenuShortcut>⌘X</ContextMenuShortcut>
					</ContextMenuItem>
				</ContextMenuGroup>

				<ContextMenuSeparator />

				<ContextMenuItem variant="destructive">
					<DeleteIcon /> Remove
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Drag the **Controls** panel to tweak props live. For example, enable “modal” to trap focus inside the menu.',
			},
		},
	},
};
