import { Lock, Mail, User } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/*───────────────────────────────────────────────────────────*
 | 📄 Meta: global configuration for every story in the file |
 *───────────────────────────────────────────────────────────*/
const meta: Meta<typeof Card> = {
	title: 'ShadcnUI/Card',
	component: Card,
	tags: ['autodocs'],
	argTypes: {
		className: {
			description: 'Tailwind utility classes appended to the root Card element',
			control: 'text',
		},
		children: {
			table: { disable: true },
		},
	},
	parameters: {
		docs: {
			description: {
				component: `
The **Card** component is a highly composable container with subcomponents:
\`CardHeader\`, \`CardTitle\`, \`CardDescription\`, \`CardContent\`, and \`CardFooter\`.
Use these to build boxed UI elements, forms, media cards, and more.
        `.trim(),
			},
		},
	},
};
export default meta;

/*───────────────────────────────────────────────────────────*
 | 🛠️ Playground (all props as controls)                     |
 *───────────────────────────────────────────────────────────*/
export const Playground: StoryObj<typeof meta> = {
	name: '⚡ Playground',
	args: {
		className: 'max-w-md',
	},
	render: args => (
		<Card {...args}>
			<CardHeader>
				<CardTitle>Playground Card</CardTitle>
				<CardDescription>
					Use Storybook controls to tweak the <code>className</code> prop & observe live updates.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="text-sm">This story is intentionally simple so you can focus on exploring props.</p>
			</CardContent>
		</Card>
	),
	parameters: {
		docs: {
			description: {
				story: 'An interactive playground with all props exposed as controls.',
			},
		},
	},
};

/*───────────────────────────────────────────────────────────*
 | 👁️ Default Card (feature demo, controls disabled)         |
 *───────────────────────────────────────────────────────────*/
export const Default: StoryObj<typeof meta> = {
	name: 'Default',
	render: args => (
		<Card {...args}>
			<CardHeader>
				<CardTitle>Default Card</CardTitle>
				<CardDescription>An out-of-the-box Card with just a header & some body content.</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<p className="text-sm">
					You can drop any element inside <code>CardContent</code>.
				</p>
				<p className="text-sm">This is a good place for text, lists, media, forms—anything!</p>
			</CardContent>
			<CardFooter>
				<Button size="sm" className="ml-auto">
					Action
				</Button>
			</CardFooter>
		</Card>
	),
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'A minimal Card showcasing every sub-component.',
			},
		},
	},
};

/*───────────────────────────────────────────────────────────*
 | 📝 Card with Form (feature demo, controls disabled)        |
 *───────────────────────────────────────────────────────────*/
export const WithForm: StoryObj<typeof meta> = {
	name: 'WithForm',
	render: args => (
		<Card {...args} className="w-[350px]">
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl">Sign in</CardTitle>
				<CardDescription>Enter your email & password below</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div className="grid gap-2">
					<Label htmlFor="email" className="flex items-center gap-1">
						<Mail className="size-4" />
						Email
					</Label>
					<Input id="email" type="email" placeholder="name@example.com" />
				</div>
				<div className="grid gap-2">
					<Label htmlFor="password" className="flex items-center gap-1">
						<Lock className="size-4" />
						Password
					</Label>
					<Input id="password" type="password" placeholder="••••••••" />
				</div>
				<Button size="sm">Sign in</Button>
			</CardContent>
			<CardFooter className="flex flex-col">
				<small className="text-muted-foreground">
					New here?
					<Button variant="link" size="sm" className="px-1">
						Create an account
					</Button>
				</small>
			</CardFooter>
		</Card>
	),
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'A login form embedded inside a Card—showing full composability.',
			},
		},
	},
};

/*───────────────────────────────────────────────────────────*
 | 🌅 Card with Media (feature demo, controls disabled)       |
 *───────────────────────────────────────────────────────────*/
export const WithMedia: StoryObj<typeof meta> = {
	name: 'WithMedia',
	render: args => (
		<Card {...args} className="overflow-hidden border-none shadow-lg rounded-xl max-w-sm">
			{/* Hero-image */}
			<div
				className="h-40 bg-center bg-cover"
				style={{
					backgroundImage: 'url(/context.png)',
				}}
				data-testid="media-bg"
			/>
			<CardHeader className="pb-0">
				<CardTitle className="text-lg">Nature & Water</CardTitle>
				<CardDescription>An Unsplash random image as header</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="text-sm leading-relaxed">
					Adding imagery to your Card is as simple as dropping a div with
					<code>background-image</code> or an <code>&lt;img&gt;</code> tag.
				</p>
			</CardContent>
			<CardFooter className="justify-between">
				<Button size="sm" variant="outline">
					Preview
				</Button>
				<Button size="sm">Download</Button>
			</CardFooter>
		</Card>
	),
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Tests overflow handling, border-radius & how media blends with the Card’s shadow.',
			},
		},
	},
};

/*───────────────────────────────────────────────────────────*
 | 🧩 Card with Icon Header & Custom Footer (feature demo)    |
 *───────────────────────────────────────────────────────────*/
export const WithIconHeader: StoryObj<typeof meta> = {
	name: 'WithIconHeader',
	render: args => (
		<Card {...args} className="max-w-xs">
			<CardHeader className="flex flex-row items-center space-y-0 gap-3">
				<User className="size-6 text-primary" />
				<div>
					<CardTitle className="text-base">Profile Completion</CardTitle>
					<CardDescription>70 % done</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				<Button variant="secondary" size="sm">
					Add picture
				</Button>
				<Button variant="secondary" size="sm">
					Verify email
				</Button>
				<Button variant="secondary" size="sm">
					Setup 2FA
				</Button>
			</CardContent>
			<CardFooter className="pt-2">
				{/* Tailwind 4 progress bar */}
				<div className="w-full bg-muted rounded-full h-2.5">
					<div
						className="bg-primary h-2.5 rounded-full transition-all"
						style={{ width: '70%' }}
						data-testid="progress-bar"
					/>
				</div>
			</CardFooter>
		</Card>
	),
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'Shows icons & custom elements (like a progress bar) in the Card layout.',
			},
		},
	},
};

/*───────────────────────────────────────────────────────────*
 | 🧪 Play function: Card Form Interactivity & Test           |
 *───────────────────────────────────────────────────────────*/
export const FormInteraction: StoryObj<typeof meta> = {
	name: 'FormInteraction (Test)',
	render: args => (
		<Card {...args} className="w-[350px]">
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl">Sign in</CardTitle>
				<CardDescription>Enter your email & password below</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div className="grid gap-2">
					<Label htmlFor="email" className="flex items-center gap-1">
						<Mail className="size-4" />
						Email
					</Label>
					<Input id="email" type="email" placeholder="name@example.com" />
				</div>
				<div className="grid gap-2">
					<Label htmlFor="password" className="flex items-center gap-1">
						<Lock className="size-4" />
						Password
					</Label>
					<Input id="password" type="password" placeholder="••••••••" />
				</div>
				<Button size="sm" type="submit">
					Sign in
				</Button>
			</CardContent>
			<CardFooter className="flex flex-col">
				<small className="text-muted-foreground">
					New here?
					<Button variant="link" size="sm" className="px-1">
						Create an account
					</Button>
				</small>
			</CardFooter>
		</Card>
	),
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story: 'A test story that simulates user interaction with the form.',
			},
		},
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Fill email
		const emailInput = canvas.getByPlaceholderText('name@example.com');
		await userEvent.type(emailInput, 'test@storybook.dev');
		await waitFor(() => {
			expect((emailInput as HTMLInputElement).value).toBe('test@storybook.dev');
		});

		// Fill password
		const passwordInput = canvas.getByPlaceholderText('••••••••');
		await userEvent.type(passwordInput, 'password123');
		await waitFor(() => {
			expect((passwordInput as HTMLInputElement).value).toBe('password123');
		});

		// Click Sign in
		const signInButton = canvas.getByRole('button', { name: /sign in/i });
		await userEvent.click(signInButton);

		// Click Create an account link
		const createAccountButton = canvas.getByRole('button', { name: /create an account/i });
		await userEvent.click(createAccountButton);
	},
};
