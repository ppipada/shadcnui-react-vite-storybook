import { User } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

/* -----------------------------------------------------------------------------
| Helpers
| --------------------------------------------------------------------------- */
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const sizeClassName = (size: AvatarSize) => {
	switch (size) {
		case 'xs':
			return 'h-6 w-6';
		case 'sm':
			return 'h-8 w-8';
		case 'md':
			return 'h-10 w-10';
		case 'lg':
			return 'h-12 w-12';
		case 'xl':
			return 'h-16 w-16';
		default:
			return 'h-10 w-10';
	}
};

const initials = (label?: string) =>
	(label ?? '')
		.split(' ')
		.map(word => word.charAt(0).toUpperCase())
		.join('')
		.slice(0, 2);

/* -----------------------------------------------------------------------------
| Storybook Meta
| --------------------------------------------------------------------------- */
interface Args {
	src: string;
	alt: string;
	size: AvatarSize;
	className?: string;
	fallbackType?: 'initials' | 'icon';
}

const meta: Meta<Args> = {
	title: 'ShadcnUI/Avatar',
	component: Avatar,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
**Avatar** component powered by [shadcn/ui](https://ui.shadcn.com/docs/components/avatar).

- Displays a user image, with automatic fallback to initials or icon.
- Fully styleable with Tailwind CSS utility classes.
- Composed of \`<Avatar>\`, \`<AvatarImage>\`, and \`<AvatarFallback>\`.
- Use for user profiles, lists, or anywhere a user representation is needed.
        `,
			},
		},
	},
	argTypes: {
		src: {
			control: 'text',
			description: 'Image source URL for the avatar.',
			table: { category: 'AvatarImage' },
		},
		alt: {
			control: 'text',
			description: 'Alt text (used for initials fallback).',
			table: { category: 'AvatarImage' },
		},
		size: {
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
			control: { type: 'inline-radio' },
			description: 'Pre-defined Tailwind size variant.',
			table: { category: 'Modifiers' },
		},
		className: {
			control: 'text',
			description: 'Additional Tailwind classes for the Avatar.',
			table: { category: 'Modifiers' },
		},
		fallbackType: {
			options: ['initials', 'icon'],
			control: { type: 'inline-radio' },
			description: 'Type of fallback to show if image fails.',
			table: { category: 'AvatarFallback' },
		},
	},
	args: {
		src: '/context.png',
		alt: '@shadcn',
		size: 'md',
		className: '',
		fallbackType: 'initials',
	},
	render: ({ src, alt, size, className, fallbackType }) => (
		<Avatar className={`${sizeClassName(size)} ${className ?? ''}`}>
			<AvatarImage src={src} alt={alt} />
			<AvatarFallback>
				{fallbackType === 'icon' || (!alt && fallbackType === 'initials') ? (
					<User className="w-4/5 h-4/5" data-testid="fallback-icon" />
				) : (
					initials(alt)
				)}
			</AvatarFallback>
		</Avatar>
	),
};

export default meta;
type Story = StoryObj<typeof meta>;

/* -----------------------------------------------------------------------------
| Playground
| --------------------------------------------------------------------------- */
export const Playground: Story = {
	name: '⚡ Playground',
	parameters: {
		docs: {
			description: {
				story: `
Interactive playground for the Avatar component.

- Change the \`src\` to test image fallback.
- Change the \`alt\` to see initials fallback.
- Change the \`size\` to see different avatar sizes.
- Add custom Tailwind classes via \`className\`.
- Switch fallback type between initials and icon.
        `,
			},
		},
	},
};

/* -----------------------------------------------------------------------------
| Feature Stories
| --------------------------------------------------------------------------- */
export const WithImage: Story = {
	name: 'With Image',
	args: {
		src: '/context.png',
		alt: '@shadcn',
		size: 'md',
		fallbackType: 'initials',
	},
	parameters: {
		docs: {
			description: {
				story: 'Displays the user photo when a **valid image URL** is provided.',
			},
		},
		controls: {
			disable: true,
		},
	},
};

export const WithFallbackText: Story = {
	name: 'With Fallback (Text)',
	args: {
		src: '',
		alt: 'Carlos Nguyen',
		size: 'md',
		fallbackType: 'initials',
	},
	parameters: {
		docs: {
			description: {
				story: 'When the image fails, the component falls back to **initials** generated from `alt`.',
			},
		},
		controls: {
			disable: true,
		},
	},
};

export const WithFallbackIcon: Story = {
	name: 'With Fallback (Icon)',
	args: {
		src: '',
		alt: '',
		size: 'md',
		fallbackType: 'icon',
	},
	parameters: {
		docs: {
			description: {
				story: 'Uses a placeholder icon when no initials can be generated.',
			},
		},
		controls: {
			disable: true,
		},
	},
};

export const WithStatusRing: Story = {
	name: 'With Status Ring',
	args: {
		src: '/context.png',
		alt: '@shadcn',
		size: 'md',
		fallbackType: 'initials',
	},
	render: ({ src, alt, size, className, fallbackType }) => (
		<div className="relative inline-block">
			<Avatar className={`${sizeClassName(size)} ring-2 ring-green-500 ${className ?? ''}`}>
				<AvatarImage src={src} alt={alt} />
				<AvatarFallback>
					{fallbackType === 'icon' || (!alt && fallbackType === 'initials') ? (
						<User className="w-4/5 h-4/5" data-testid="fallback-icon" />
					) : (
						initials(alt)
					)}
				</AvatarFallback>
			</Avatar>
			<span
				className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-neutral-900"
				data-testid="status-indicator"
			/>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Adds a **Tailwind ring** and a **small badge** to denote online status.',
			},
		},
		controls: {
			disable: true,
		},
	},
};

export const Sizes: Story = {
	name: 'All Sizes',
	render: () => (
		<div className="flex gap-4 items-end">
			{(['xs', 'sm', 'md', 'lg', 'xl'] as AvatarSize[]).map(size => (
				<Avatar key={size} className={sizeClassName(size)}>
					<AvatarImage src="/context.png" alt={size} />
					<AvatarFallback>{size.toUpperCase()}</AvatarFallback>
				</Avatar>
			))}
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Showcases all available avatar sizes.',
			},
		},
		controls: {
			disable: true,
		},
	},
};

/* -----------------------------------------------------------------------------
| Play Function Stories (Component Tests)
| --------------------------------------------------------------------------- */
export const FallbackToInitials: Story = {
	name: 'Test: Fallback to Initials',
	args: {
		src: '',
		alt: 'Jane Doe',
		size: 'md',
		fallbackType: 'initials',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByText('JD')).toBeInTheDocument();
		// AvatarImage is rendered but with empty src, so it should not be visible as an image
		// We check that the fallback is visible and the image is not rendered with a valid src
		const img = canvas.queryByRole('img');
		if (img) {
			expect(img).not.toBeVisible();
		}
	},
	parameters: {
		docs: {
			description: {
				story: 'Test: Should fallback to initials when image fails.',
			},
		},
		controls: {
			disable: true,
		},
	},
};

export const FallbackToIcon: Story = {
	name: 'Test: Fallback to Icon',
	args: {
		src: '',
		alt: '',
		size: 'md',
		fallbackType: 'icon',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByTestId('fallback-icon')).toBeInTheDocument();
	},
	parameters: {
		docs: {
			description: {
				story: 'Test: Should fallback to icon when no initials available.',
			},
		},
		controls: {
			disable: true,
		},
	},
};

export const StatusRingTest: Story = {
	name: 'Test: Status Ring',
	args: {
		src: '/context.png',
		alt: '@shadcn',
		size: 'md',
		fallbackType: 'initials',
	},
	render: ({ src, alt, size, className, fallbackType }) => (
		<div className="relative inline-block">
			<Avatar className={`${sizeClassName(size)} ring-2 ring-green-500 ${className ?? ''}`}>
				<AvatarImage src={src} alt={alt} />
				<AvatarFallback>
					{fallbackType === 'icon' || (!alt && fallbackType === 'initials') ? (
						<User className="w-4/5 h-4/5" data-testid="fallback-icon" />
					) : (
						initials(alt)
					)}
				</AvatarFallback>
			</Avatar>
			<span
				className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-neutral-900"
				data-testid="status-indicator"
			/>
		</div>
	),
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByTestId('status-indicator')).toBeInTheDocument();
	},
	parameters: {
		docs: {
			description: {
				story: 'Test: Status ring and indicator should be present.',
			},
		},
		controls: {
			disable: true,
		},
	},
};
