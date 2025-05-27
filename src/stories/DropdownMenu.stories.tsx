import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

/**
 * Small helper button.
 * Replace with your own `<Button>` component if you already have one
 * in your design system.
 */
const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
	<button
		className="inline-flex items-center gap-1 rounded-md border bg-background px-3 py-1.5 text-sm font-medium text-foreground shadow-sm hover:bg-muted disabled:opacity-50"
		{...props}
	>
		{children}
	</button>
);

/* -------------------------------------------------------------------------- */
/*                                   Meta                                     */
/* -------------------------------------------------------------------------- */

const meta = {
	title: 'ShadcnUI/DropdownMenu',
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
 shadcn/ui \`DropdownMenu\` is a fully accessible menu component
 powered by Radix UI.
 
 • **Keyboard friendly** (Arrow keys, Home/End, ESC, Type-ahead)  
 • **Fully styleable** through Tailwind CSS v4 classes  
 • **Composable**—bring your own trigger, content, items, etc.  
      `,
			},
		},
	},
} satisfies Meta;
export default meta;

/* -------------------------------------------------------------------------- */
/*                                    Demo                                   */
/* -------------------------------------------------------------------------- */

/* ------------------------------ 1.  Basic --------------------------------- */

const BasicDemo = () => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button>Open menu</Button>
		</DropdownMenuTrigger>

		<DropdownMenuContent sideOffset={8}>
			<DropdownMenuItem>
				Profile
				<DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
			</DropdownMenuItem>

			<DropdownMenuItem inset>Settings</DropdownMenuItem>

			<DropdownMenuSeparator />

			<DropdownMenuItem variant="destructive">
				Log out
				<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
);

export const Basic: StoryObj = {
	name: 'Basic',
	render: () => <BasicDemo />,
};

/* ------------------------------ 2. Checkbox ------------------------------ */

const CheckboxDemo = () => {
	const [bookmarks, setBookmarks] = useState(true);
	const [urls, setUrls] = useState(false);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button>Show columns</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<DropdownMenuCheckboxItem checked={bookmarks} onCheckedChange={setBookmarks as any}>
					Bookmarks
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem checked disabled>
					Tags
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem checked={urls} onCheckedChange={setUrls as any}>
					URLs
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const Checkbox: StoryObj = {
	name: 'Checkbox items',
	render: () => <CheckboxDemo />,
};

/* ------------------------------ 3. Radio ---------------------------------- */

const RadioDemo = () => {
	const [font, setFont] = useState<'serif' | 'mono' | 'sans'>('sans');
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button>Choose font</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				<DropdownMenuRadioGroup value={font} onValueChange={setFont as any}>
					<DropdownMenuRadioItem value="sans">Inter (sans)</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="serif">Times (serif)</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="mono">SF Mono (mono)</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const Radio: StoryObj = {
	name: 'Radio group',
	render: () => <RadioDemo />,
};

/* ------------------------------ 4. Sub-menu ------------------------------ */

const SubmenuDemo = () => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button>More actions</Button>
		</DropdownMenuTrigger>

		<DropdownMenuContent>
			<DropdownMenuItem>Copy</DropdownMenuItem>
			<DropdownMenuItem>Cut</DropdownMenuItem>

			<DropdownMenuSub>
				<DropdownMenuSubTrigger inset>Share →</DropdownMenuSubTrigger>
				<DropdownMenuSubContent>
					<DropdownMenuItem>Email</DropdownMenuItem>
					<DropdownMenuItem>Slack</DropdownMenuItem>
					<DropdownMenuItem>Twitter</DropdownMenuItem>
				</DropdownMenuSubContent>
			</DropdownMenuSub>

			<DropdownMenuSeparator />
			<DropdownMenuItem variant="destructive">Delete…</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
);

export const Submenu: StoryObj = {
	name: 'Sub-menu',
	render: () => <SubmenuDemo />,
};

/* ------------------------------ 5. Playground ----------------------------- */

type PlaygroundArgs = {
	side: 'top' | 'right' | 'bottom' | 'left';
	align: 'start' | 'center' | 'end';
};

const PlaygroundTemplate = ({ side, align }: PlaygroundArgs) => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button>
				Side: <code className="ml-1">{side}</code>, Align: <code className="ml-1">{align}</code>
			</Button>
		</DropdownMenuTrigger>

		<DropdownMenuContent side={side} align={align}>
			<DropdownMenuItem>Item A</DropdownMenuItem>
			<DropdownMenuItem>Item B</DropdownMenuItem>
			<DropdownMenuItem inset>Item C</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
);

export const Playground: StoryObj<PlaygroundArgs> = {
	name: '⚡ Playground',
	args: { side: 'bottom', align: 'start' },
	argTypes: {
		side: {
			options: ['top', 'right', 'bottom', 'left'],
			control: { type: 'radio' },
		},
		align: {
			options: ['start', 'center', 'end'],
			control: { type: 'radio' },
		},
	},
	render: args => <PlaygroundTemplate {...args} />,
};

Basic.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);
	await userEvent.click(canvas.getByRole('button', { name: /open menu/i }));
	await expect(canvas.getByRole('menu')).toBeVisible();
};
