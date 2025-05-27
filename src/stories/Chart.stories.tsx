/* ---------------------------------------------------------------------------
| ShadcnUI/Chart – Re-charts demos (React 19 + Vite 6 + Tailwind 4)
| ------------------------------------------------------------------------ */
import { Activity, Box, Briefcase } from 'lucide-react';

import type { Meta, StoryObj } from '@storybook/react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts';

import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';

/* ────────────────────────────────────────────────────────────────────────────
 * Demo data
 * ────────────────────────────────────────────────────────────────────────── */

const demoData = [
	{ name: 'Jan', revenue: 4000, profit: 2400, sales: 2400 },
	{ name: 'Feb', revenue: 3000, profit: 1398, sales: 2210 },
	{ name: 'Mar', revenue: 2000, profit: 9800, sales: 2290 },
	{ name: 'Apr', revenue: 2780, profit: 3908, sales: 2000 },
	{ name: 'May', revenue: 1890, profit: 4800, sales: 2181 },
	{ name: 'Jun', revenue: 2390, profit: 3800, sales: 2500 },
	{ name: 'Jul', revenue: 3490, profit: 4300, sales: 2100 },
];

/* ────────────────────────────────────────────────────────────────────────────
 * Theme-aware colour tokens (match Tailwind/Shadcn design-tokens)
 * ────────────────────────────────────────────────────────────────────────── */

const chartConfig: ChartConfig = {
	revenue: {
		label: 'Revenue',
		color: 'hsl(var(--chart-1))',
		icon: Activity,
	},
	profit: {
		label: 'Profit',
		color: 'hsl(var(--chart-2))',
		icon: Briefcase,
	},
	sales: {
		label: 'Sales',
		color: 'hsl(var(--chart-3))',
		icon: Box,
	},
};

/* ────────────────────────────────────────────────────────────────────────────
 * Storybook Meta
 * ────────────────────────────────────────────────────────────────────────── */

const meta: Meta<typeof ChartContainer> = {
	title: 'ShadcnUI/Chart',
	component: ChartContainer,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
# Chart Components

Shadcn styled, fully typed wrapper around **Recharts** for beautiful, responsive charts.

## Features

- 🎨 Theme-aware with CSS custom properties
- 📱 Fully responsive with ResponsiveContainer
- 🔧 TypeScript support with ChartConfig
- 🎯 Accessible tooltips and legends
- 🌙 Dark mode support

## Usage

\`\`\`tsx
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart, Bar, ResponsiveContainer } from 'recharts'

const chartConfig = {
  revenue: { label: 'Revenue', color: 'hsl(var(--chart-1))' }
}

<ChartContainer config={chartConfig} className="h-80">
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data}>
      <Bar dataKey="revenue" fill="var(--color-revenue)" />
      <ChartTooltip content={<ChartTooltipContent />} />
    </BarChart>
  </ResponsiveContainer>
</ChartContainer>
\`\`\`

## Chart Types

- **Bar Charts** - Great for comparing categories
- **Line Charts** - Perfect for trends over time  
- **Area Charts** - Show cumulative values
- **Pie Charts** - Display proportions and parts of whole
        `,
			},
		},
	},
	decorators: [
		Story => (
			<div className="w-full max-w-4xl">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof meta>;

/* ────────────────────────────────────────────────────────────────────────────
 * 01 Bar Chart
 * ────────────────────────────────────────────────────────────────────────── */

export const BarChartStory: Story = {
	name: 'Bar Chart',
	render: () => (
		<ChartContainer config={chartConfig} className="h-80 w-full">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={demoData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
					<XAxis dataKey="name" className="fill-muted-foreground text-xs" tickLine={false} axisLine={false} />
					<YAxis className="fill-muted-foreground text-xs" tickLine={false} axisLine={false} />
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
					<Bar dataKey="profit" fill="var(--color-profit)" radius={[4, 4, 0, 0]} />
					<Bar dataKey="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</ChartContainer>
	),
	parameters: {
		docs: {
			description: {
				story: `
A classic **bar chart** comparing multiple data series across categories. Perfect for:

- Comparing values across categories
- Showing performance metrics
- Displaying survey results

**Features:**
- Rounded corners for modern look
- Responsive design
- Interactive tooltips
- Color-coded legend
			`,
			},
		},
	},
};

/* ────────────────────────────────────────────────────────────────────────────
 * 02 Line Chart - Fixed to show actual lines
 * ────────────────────────────────────────────────────────────────────────── */

export const LineStory: Story = {
	name: 'Line Chart',
	render: () => (
		<ChartContainer config={chartConfig} className="h-80 w-full">
			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={demoData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
					<XAxis dataKey="name" className="fill-muted-foreground text-xs" tickLine={false} axisLine={false} />
					<YAxis className="fill-muted-foreground text-xs" tickLine={false} axisLine={false} />
					<ChartTooltip
						cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1 }}
						content={<ChartTooltipContent indicator="line" />}
					/>
					<ChartLegend content={<ChartLegendContent />} />
					<Line
						type="monotone"
						dataKey="revenue"
						stroke="var(--color-revenue)"
						strokeWidth={2}
						connectNulls={false}
						dot={{ fill: 'var(--color-revenue)', strokeWidth: 0, r: 3 }}
						activeDot={{ r: 5, stroke: 'var(--color-revenue)', strokeWidth: 2, fill: 'hsl(var(--background))' }}
					/>
					<Line
						type="monotone"
						dataKey="profit"
						stroke="var(--color-profit)"
						strokeWidth={2}
						connectNulls={false}
						dot={{ fill: 'var(--color-profit)', strokeWidth: 0, r: 3 }}
						activeDot={{ r: 5, stroke: 'var(--color-profit)', strokeWidth: 2, fill: 'hsl(var(--background))' }}
					/>
					<Line
						type="monotone"
						dataKey="sales"
						stroke="var(--color-sales)"
						strokeWidth={2}
						connectNulls={false}
						dot={{ fill: 'var(--color-sales)', strokeWidth: 0, r: 3 }}
						activeDot={{ r: 5, stroke: 'var(--color-sales)', strokeWidth: 2, fill: 'hsl(var(--background))' }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</ChartContainer>
	),
	parameters: {
		docs: {
			description: {
				story: `
Smooth **line chart** with enhanced interaction states. Ideal for:

- Showing trends over time
- Tracking progress
- Displaying time-series data

**Features:**
- Smooth monotone curves
- Interactive dots on hover
- Enhanced active states
- Customizable line indicators
			`,
			},
		},
	},
};

/* ────────────────────────────────────────────────────────────────────────────
 * 03 Area Chart
 * ────────────────────────────────────────────────────────────────────────── */

export const AreaStory: Story = {
	name: 'Area Chart',
	render: () => (
		<ChartContainer config={chartConfig} className="h-80 w-full">
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart data={demoData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
					<XAxis dataKey="name" className="fill-muted-foreground text-xs" tickLine={false} axisLine={false} />
					<YAxis className="fill-muted-foreground text-xs" tickLine={false} axisLine={false} />
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Area
						type="monotone"
						dataKey="revenue"
						stackId="1"
						stroke="var(--color-revenue)"
						fill="var(--color-revenue)"
						fillOpacity={0.8}
					/>
					<Area
						type="monotone"
						dataKey="profit"
						stackId="1"
						stroke="var(--color-profit)"
						fill="var(--color-profit)"
						fillOpacity={0.8}
					/>
					<Area
						type="monotone"
						dataKey="sales"
						stackId="1"
						stroke="var(--color-sales)"
						fill="var(--color-sales)"
						fillOpacity={0.8}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</ChartContainer>
	),
	parameters: {
		docs: {
			description: {
				story: `
Stacked **area chart** showing cumulative values over time. Great for:

- Visualizing part-to-whole relationships
- Showing cumulative totals
- Displaying layered data

**Features:**
- Stacked areas for better comparison
- Semi-transparent fills
- Smooth area transitions
- Enhanced readability
			`,
			},
		},
	},
};

/* ────────────────────────────────────────────────────────────────────────────
 * 04 Pie Chart - Fixed data structure and rendering
 * ────────────────────────────────────────────────────────────────────────── */

export const PieStory: Story = {
	name: 'Pie Chart',
	render: () => {
		// Use simple data structure for pie chart
		const pieData = [
			{ name: 'Revenue', value: 4000 },
			{ name: 'Profit', value: 3000 },
			{ name: 'Sales', value: 2000 },
		];

		return (
			<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[400px]">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<ChartTooltip content={<ChartTooltipContent hideLabel />} />
						<ChartLegend content={<ChartLegendContent />} />
						<Pie
							data={pieData}
							dataKey="value"
							nameKey="name"
							cx="50%"
							cy="50%"
							outerRadius={120}
							innerRadius={60}
							paddingAngle={2}
							strokeWidth={2}
							stroke="hsl(var(--background))"
							fill="var(--color-revenue)"
						>
							{pieData.map((entry, index) => {
								const colors = ['var(--color-revenue)', 'var(--color-profit)', 'var(--color-sales)'];
								return <Pie dataKey="value" key={`cell-${index}`} fill={colors[index % colors.length]} />;
							})}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</ChartContainer>
		);
	},
	parameters: {
		docs: {
			description: {
				story: `
Modern **donut chart** with clean styling. Perfect for:

- Showing proportions and percentages
- Displaying market share
- Visualizing survey responses

**Features:**
- Donut style with inner radius
- Subtle padding between segments
- Interactive hover states
- Clean legend integration
			`,
			},
		},
	},
};

/* ────────────────────────────────────────────────────────────────────────────
 * 05 Dark Theme - Enhanced visibility
 * ────────────────────────────────────────────────────────────────────────── */

export const ThemedDark: Story = {
	name: 'Dark Theme',
	decorators: [
		Story => (
			<div className="dark min-h-[500px] rounded-lg bg-slate-900 p-6">
				<Story />
			</div>
		),
	],
	render: () => {
		// Enhanced dark theme config with better contrast
		const darkChartConfig: ChartConfig = {
			revenue: {
				label: 'Revenue',
				icon: Activity,
				color: 'hsl(var(--chart-1))',
			},
			profit: {
				label: 'Profit',
				icon: Briefcase,
				color: 'hsl(var(--chart-2))',
			},
			sales: {
				label: 'Sales',
				icon: Box,
				color: 'hsl(var(--chart-3))',
			},
		};

		return (
			<ChartContainer config={darkChartConfig} className="h-80 w-full">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart data={demoData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 26%)" />
						<XAxis dataKey="name" tick={{ fill: 'hsl(220 9% 46%)', fontSize: 12 }} tickLine={false} axisLine={false} />
						<YAxis tick={{ fill: 'hsl(220 9% 46%)', fontSize: 12 }} tickLine={false} axisLine={false} />
						<ChartTooltip content={<ChartTooltipContent />} />
						<ChartLegend content={<ChartLegendContent />} />
						<Area
							type="monotone"
							dataKey="revenue"
							stroke="var(--color-revenue)"
							fill="var(--color-revenue)"
							fillOpacity={0.2}
							strokeWidth={2}
						/>
						<Area
							type="monotone"
							dataKey="profit"
							stroke="var(--color-profit)"
							fill="var(--color-profit)"
							fillOpacity={0.2}
							strokeWidth={2}
						/>
						<Area
							type="monotone"
							dataKey="sales"
							stroke="var(--color-sales)"
							fill="var(--color-sales)"
							fillOpacity={0.2}
							strokeWidth={2}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</ChartContainer>
		);
	},
	parameters: {
		docs: {
			description: {
				story: `
Automatic **dark mode** theming with CSS custom properties. Features:

- Seamless light/dark theme switching
- Enhanced contrast for better visibility
- Automatic text color adjustments
- Consistent visual hierarchy

**Implementation:**
\`\`\`tsx
// Colors automatically adapt based on theme
color: 'hsl(var(--chart-1))'

// Enhanced dark mode styling
<XAxis tick={{ fill: 'hsl(220 9% 46%)', fontSize: 12 }} />
\`\`\`
			`,
			},
		},
	},
};

/* ────────────────────────────────────────────────────────────────────────────
 * 06 Loading State
 * ────────────────────────────────────────────────────────────────────────── */

export const Skeleton: Story = {
	name: 'Loading State',
	render: () => (
		<div className="h-80 w-full">
			<div className="mb-4 flex items-center justify-between">
				<div className="h-6 w-32 animate-pulse rounded bg-muted" />
				<div className="h-4 w-24 animate-pulse rounded bg-muted" />
			</div>
			<div className="h-64 w-full animate-pulse rounded-lg bg-muted" />
			<div className="mt-4 flex justify-center gap-4">
				<div className="h-4 w-16 animate-pulse rounded bg-muted" />
				<div className="h-4 w-16 animate-pulse rounded bg-muted" />
				<div className="h-4 w-16 animate-pulse rounded bg-muted" />
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: `
Accessible **loading placeholder** while chart data loads. Features:

- Smooth pulse animation
- Maintains layout structure
- Accessible to screen readers
- Consistent with design system

**Usage:**
\`\`\`tsx
{isLoading ? <ChartSkeleton /> : <Chart data={data} />}
\`\`\`
			`,
			},
		},
	},
};

/* ────────────────────────────────────────────────────────────────────────────
 * 07 Playground
 * ────────────────────────────────────────────────────────────────────────── */

interface PlaygroundProps {
	showRevenue: boolean;
	showProfit: boolean;
	showSales: boolean;
	barSize: number;
	chartType: 'bar' | 'line' | 'area';
}

export const Playground: StoryObj<PlaygroundProps> = {
	name: '⚡ Playground',
	args: {
		showRevenue: true,
		showProfit: true,
		showSales: true,
		barSize: 24,
		chartType: 'bar',
	},
	argTypes: {
		showRevenue: {
			control: 'boolean',
			name: 'Show Revenue',
			description: 'Toggle revenue data series',
		},
		showProfit: {
			control: 'boolean',
			name: 'Show Profit',
			description: 'Toggle profit data series',
		},
		showSales: {
			control: 'boolean',
			name: 'Show Sales',
			description: 'Toggle sales data series',
		},
		barSize: {
			control: { type: 'range', min: 8, max: 48, step: 4 },
			name: 'Bar Size',
			description: 'Width of each bar (bar chart only)',
		},
		chartType: {
			control: { type: 'select' },
			options: ['bar', 'line', 'area'],
			name: 'Chart Type',
			description: 'Select chart visualization type',
		},
	},
	render: args => {
		const { showRevenue, showProfit, showSales, barSize, chartType } = args;

		// Create a single chart component based on type to avoid multiple children error
		const renderChart = () => {
			const commonProps = {
				data: demoData,
				margin: { top: 20, right: 30, left: 20, bottom: 5 },
			};

			const commonElements = (
				<>
					<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
					<XAxis dataKey="name" className="fill-muted-foreground text-xs" tickLine={false} axisLine={false} />
					<YAxis className="fill-muted-foreground text-xs" tickLine={false} axisLine={false} />
					<ChartTooltip content={<ChartTooltipContent indicator={chartType === 'line' ? 'line' : 'dot'} />} />
					<ChartLegend content={<ChartLegendContent />} />
				</>
			);

			switch (chartType) {
				case 'bar':
					return (
						<BarChart {...commonProps}>
							{commonElements}
							{showRevenue && (
								<Bar dataKey="revenue" fill="var(--color-revenue)" barSize={barSize} radius={[4, 4, 0, 0]} />
							)}
							{showProfit && (
								<Bar dataKey="profit" fill="var(--color-profit)" barSize={barSize} radius={[4, 4, 0, 0]} />
							)}
							{showSales && <Bar dataKey="sales" fill="var(--color-sales)" barSize={barSize} radius={[4, 4, 0, 0]} />}
						</BarChart>
					);

				case 'line':
					return (
						<LineChart {...commonProps}>
							{commonElements}
							{showRevenue && (
								<Line
									type="monotone"
									dataKey="revenue"
									stroke="var(--color-revenue)"
									strokeWidth={2}
									dot={{ fill: 'var(--color-revenue)', strokeWidth: 0, r: 3 }}
									activeDot={{ r: 5, stroke: 'var(--color-revenue)', strokeWidth: 2 }}
								/>
							)}
							{showProfit && (
								<Line
									type="monotone"
									dataKey="profit"
									stroke="var(--color-profit)"
									strokeWidth={2}
									dot={{ fill: 'var(--color-profit)', strokeWidth: 0, r: 3 }}
									activeDot={{ r: 5, stroke: 'var(--color-profit)', strokeWidth: 2 }}
								/>
							)}
							{showSales && (
								<Line
									type="monotone"
									dataKey="sales"
									stroke="var(--color-sales)"
									strokeWidth={2}
									dot={{ fill: 'var(--color-sales)', strokeWidth: 0, r: 3 }}
									activeDot={{ r: 5, stroke: 'var(--color-sales)', strokeWidth: 2 }}
								/>
							)}
						</LineChart>
					);

				case 'area':
					return (
						<AreaChart {...commonProps}>
							{commonElements}
							{showRevenue && (
								<Area
									type="monotone"
									dataKey="revenue"
									stackId="1"
									stroke="var(--color-revenue)"
									fill="var(--color-revenue)"
									fillOpacity={0.8}
								/>
							)}
							{showProfit && (
								<Area
									type="monotone"
									dataKey="profit"
									stackId="1"
									stroke="var(--color-profit)"
									fill="var(--color-profit)"
									fillOpacity={0.8}
								/>
							)}
							{showSales && (
								<Area
									type="monotone"
									dataKey="sales"
									stackId="1"
									stroke="var(--color-sales)"
									fill="var(--color-sales)"
									fillOpacity={0.8}
								/>
							)}
						</AreaChart>
					);
			}
		};

		return (
			<ChartContainer config={chartConfig} className="h-80 w-full">
				<ResponsiveContainer width="100%" height="100%">
					{renderChart()}
				</ResponsiveContainer>
			</ChartContainer>
		);
	},
	parameters: {
		docs: {
			description: {
				story: `
### Interactive Playground

Experiment with different chart configurations and data series. Features:

- **Chart Type Selection** - Switch between bar, line, and area charts
- **Data Series Toggles** - Show/hide individual data series
- **Bar Size Control** - Adjust bar width for bar charts
- **Real-time Updates** - See changes immediately

**Perfect for:**
- Testing different visualizations
- Finding the best chart type for your data
- Customizing appearance
- Prototyping dashboard layouts
			`,
			},
		},
	},
};
