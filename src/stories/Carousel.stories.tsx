// ShadcnUI/Carousel.stories.tsx
import * as React from 'react';

import { Image } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import clsx from 'clsx';
import EmblaAutoPlay from 'embla-carousel-autoplay';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

/* -------------------------------------------------------------
 * Fake slide data
 * ----------------------------------------------------------- */
const slides = ['/addon-library.png', '/random-image.jpg', '/share.png'];

/* -------------------------------------------------------------
 * Helpers
 * ----------------------------------------------------------- */
function Slide({ src, alt, className }: { src?: string; alt?: string; className?: string }) {
	return (
		<div
			className={clsx('relative flex h-64 items-center justify-center overflow-hidden rounded-lg bg-muted', className)}
			data-testid="carousel-slide"
		>
			{src ? (
				<img src={src} alt={alt} className="h-full w-full object-cover object-center" data-testid="carousel-img" />
			) : (
				<Image className="h-10 w-10 text-muted-foreground" data-testid="carousel-placeholder" />
			)}
		</div>
	);
}

/* -------------------------------------------------------------
 * Meta
 * ----------------------------------------------------------- */
const meta: Meta<typeof Carousel> = {
	title: 'ShadcnUI/Carousel',
	component: Carousel,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
A responsive, touch-friendly **Carousel** built on top of shadcn/ui (Embla) & TailwindCSS 4.

- Supports custom controls, autoplay, indicators, and responsive layouts.
- Use \`opts\` prop to pass Embla options.
- Use \`plugins\` prop for Embla plugins (e.g. autoplay).

For detailed setup, refer to the official docs: https://ui.shadcn.com/docs/components/carousel
        `,
			},
		},
	},
};
export default meta;

/* -------------------------------------------------------------
 * 1️⃣ Playground (All props as controls)
 * ----------------------------------------------------------- */
export const Playground: StoryObj<typeof Carousel> = {
	name: '⚡ Playground',
	args: {
		opts: {
			loop: false,
		},
		className: '',
	},
	argTypes: {
		opts: {
			description: 'Pass-through options for Embla Carousel',
			control: { type: 'object' },
		},
		className: {
			control: { type: 'text' },
		},
		plugins: {
			control: false,
			table: { disable: true },
		},
		children: {
			control: false,
			table: { disable: true },
		},
	},
	render: ({ opts, className }) => (
		<Carousel className={clsx('w-full max-w-lg', className)} opts={opts}>
			<CarouselContent>
				{slides.map((src, idx) => (
					<CarouselItem key={idx}>
						<Slide src={src} alt={`Slide ${idx + 1}`} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Use the controls panel to tweak `opts` and see how the carousel reacts. This is a fully interactive playground.',
			},
		},
	},
};

/* -------------------------------------------------------------
 * 2️⃣ Basic (Default usage)
 * ----------------------------------------------------------- */
export const Basic: StoryObj<typeof Carousel> = {
	name: 'Basic',
	render: args => (
		<Carousel {...args} className="w-full max-w-lg">
			<CarouselContent>
				{slides.map((src, idx) => (
					<CarouselItem key={idx}>
						<Slide src={src} alt={`Slide ${idx + 1}`} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	),
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story:
					'The default carousel with previous and next controls. Swipe on touch screens or use the controls to navigate.',
			},
		},
	},
	play: async ({ canvasElement }) => {
		// Test: Carousel renders, navigation works
		const canvas = within(canvasElement);
		const nextBtn = await canvas.findByLabelText(/next/i);
		const prevBtn = await canvas.findByLabelText(/previous/i);

		// Should be on first slide
		expect(await canvas.findByAltText('Slide 1')).toBeInTheDocument();

		// Click next
		await userEvent.click(nextBtn);
		expect(await canvas.findByAltText('Slide 2')).toBeInTheDocument();

		// Click previous
		await userEvent.click(prevBtn);
		expect(await canvas.findByAltText('Slide 1')).toBeInTheDocument();
	},
};

/* -------------------------------------------------------------
 * 3️⃣ Autoplay
 * ----------------------------------------------------------- */
export const Autoplay: StoryObj<typeof Carousel> = {
	name: 'Autoplay',
	render: args => (
		<Carousel
			{...args}
			className="w-full max-w-lg"
			opts={{
				...args.opts,
				loop: true,
			}}
			plugins={[
				EmblaAutoPlay({
					delay: 1000, // Short delay for test
				}),
			]}
		>
			<CarouselContent>
				{slides.map((src, idx) => (
					<CarouselItem key={idx}>
						<Slide src={src} alt={`Slide ${idx + 1}`} />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	),
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story:
					'Autoplay example using **embla-carousel-autoplay**. The carousel loops infinitely and pauses on user interaction.',
			},
		},
	},
	play: async ({ canvasElement }) => {
		// Test: Carousel auto-advances
		const canvas = within(canvasElement);
		expect(await canvas.findByAltText('Slide 1')).toBeInTheDocument();
		await new Promise(res => setTimeout(res, 1200));
		expect(await canvas.findByAltText('Slide 2')).toBeInTheDocument();
	},
};

/* -------------------------------------------------------------
 * 4️⃣ With Indicators (feature demo)
 * ----------------------------------------------------------- */
export const WithIndicators: StoryObj<typeof Carousel> = {
	name: 'With Indicators',
	render: args => {
		// We'll use a local state to simulate indicator selection
		const [selected, setSelected] = React.useState(0);
		const emblaRef = React.useRef<any>(null);

		// Listen to Embla's select event to update indicator
		React.useEffect(() => {
			if (!emblaRef.current) return;
			const embla = emblaRef.current;
			const onSelect = () => setSelected(embla.selectedScrollSnap());
			embla.on('select', onSelect);
			return () => embla.off('select', onSelect);
		}, [emblaRef.current]);

		return (
			<div className="flex w-full max-w-lg flex-col space-y-2">
				<Carousel {...args} ref={emblaRef}>
					<CarouselContent>
						{slides.map((src, idx) => (
							<CarouselItem key={idx}>
								<Slide src={src} alt={`Slide ${idx + 1}`} />
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
				<div className="flex items-center justify-center space-x-2">
					{slides.map((_, idx) => (
						<button
							key={idx}
							className={clsx('h-2 w-2 rounded-full bg-muted transition-colors', selected === idx && 'bg-primary')}
							aria-label={`Go to slide ${idx + 1}`}
							data-active={selected === idx}
							onClick={() => {
								emblaRef.current?.scrollTo(idx);
								setSelected(idx);
							}}
							type="button"
							data-testid={`indicator-${idx}`}
						/>
					))}
				</div>
			</div>
		);
	},
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story:
					"Demonstrates how you might add custom pagination indicators outside of the core Carousel component. Indicators are wired to Embla's API.",
			},
		},
	},
	play: async ({ canvasElement }) => {
		// Test: Clicking indicators navigates to correct slide
		const canvas = within(canvasElement);
		const indicator2 = await canvas.findByTestId('indicator-1');
		await userEvent.click(indicator2);
		expect(await canvas.findByAltText('Slide 2')).toBeInTheDocument();
		const indicator1 = await canvas.findByTestId('indicator-0');
		await userEvent.click(indicator1);
		expect(await canvas.findByAltText('Slide 1')).toBeInTheDocument();
	},
};

/* -------------------------------------------------------------
 * 5️⃣ Responsive (multiple slides per view)
 * ----------------------------------------------------------- */
export const Responsive: StoryObj<typeof Carousel> = {
	name: 'Responsive (multiple slides)',
	render: args => (
		<Carousel
			{...args}
			className="w-full max-w-4xl"
			opts={{
				align: 'start',
				loop: true,
				skipSnaps: false,
				...args.opts,
			}}
		>
			<CarouselContent className="-ml-2">
				{[...Array(10).keys()].map(idx => (
					<CarouselItem key={idx} className="pl-2 basis-1/2 md:basis-1/3 lg:basis-1/4">
						<Slide src="/random-image.jpg" alt={`Random ${idx}`} className="h-40 md:h-56" />
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="-left-4" />
			<CarouselNext className="-right-4" />
		</Carousel>
	),
	parameters: {
		controls: { disable: true },
		docs: {
			description: {
				story:
					"Shows multiple slides per viewport width. Tailwind's `basis-*` utilities make it easy to define responsive grid-like behaviour.",
			},
		},
	},
	play: async ({ canvasElement }) => {
		// Test: Multiple slides are visible
		const canvas = within(canvasElement);
		const slides = await canvas.findAllByTestId('carousel-slide');
		expect(slides.length).toBeGreaterThan(1);
	},
};
