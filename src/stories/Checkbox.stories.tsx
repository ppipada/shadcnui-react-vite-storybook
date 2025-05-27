import * as React from 'react';

import { CheckIcon, MinusIcon } from 'lucide-react';

import type { CheckedState } from '@radix-ui/react-checkbox';
import type { Meta, StoryObj } from '@storybook/react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

/* ─────────────────────────────────────────── META ─────────────────────────── */

const meta: Meta<typeof Checkbox> = {
  title: 'ShadcnUI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
shadcn/ui **Checkbox** built on Radix primitives.

• Accessible & composable  
• Supports controlled / uncontrolled usage  
• Accepts \`checked\` \`boolean | "indeterminate"\` for tri-state  
• Plays nicely with **react-hook-form**

The stories below cover the day-to-day use-cases plus an interactive
Playground.
        `,
      },
    },
  },
  argTypes: {
    checked: {
      control: { type: 'radio' },
      options: [false, true, 'indeterminate'],
      defaultValue: false,
      table: { type: { summary: 'boolean | "indeterminate"' } },
    },
    disabled: { control: 'boolean', defaultValue: false },
    id: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/* ───────────────────────────────────── STORIES ────────────────────────────── */

/* 1 ────────────────────────────── Default ─────────────────────────────────── */

export const Default: Story = {
  render: args => <Checkbox {...args} />,
  parameters: {
    docs: { description: { story: 'Bare uncontrolled checkbox.' } },
  },
};

/* 2 ───────────────────────────── With Label ───────────────────────────────── */

export const WithLabel: Story = {
  render: args => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" {...args} />
      <Label htmlFor="terms">Accept terms &amp; conditions</Label>
    </div>
  ),
  args: { id: 'terms' },
  parameters: {
    docs: { description: { story: 'Checkbox paired with a text label.' } },
  },
};

/* 3 ─────────────────────────── Controlled (useState) ──────────────────────── */

export const Controlled: Story = {
  name: 'Controlled (useState)',
  render: args => {
    const [checked, setChecked] = React.useState<CheckedState>(false);
    return (
      <div className="flex items-center gap-2">
        <Checkbox {...args} id="newsletter" checked={checked} onCheckedChange={setChecked} />
        <Label htmlFor="newsletter">Subscribe to newsletter ({String(checked)})</Label>
      </div>
    );
  },
  parameters: {
    docs: { description: { story: 'Value fully managed by `useState`.' } },
  },
};

/* 4 ─────────────────────────── Tri-state / Indeterminate ──────────────────── */

export const Indeterminate: Story = {
  name: 'Indeterminate (tri-state)',
  render: () => {
    const [state, setState] = React.useState<CheckedState>('indeterminate');

    const cycle = (v: CheckedState): CheckedState => (v === 'indeterminate' ? true : v ? false : 'indeterminate');

    return (
      <div className="space-y-2">
        <Checkbox
          id="tri"
          checked={state}
          onCheckedChange={val => setState(val)}
          /* Replace indicator so we see a minus when indeterminate              */
        >
          {state === 'indeterminate' && <MinusIcon className="h-3.5 w-3.5 stroke-[3]" />}
        </Checkbox>

        <Label htmlFor="tri" className="block">
          Current: <span className="font-mono">{String(state)}</span>
        </Label>

        <Button size="sm" variant="secondary" onClick={() => setState(s => cycle(s))}>
          Cycle state programmatically
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
The Radix prop \`checked\` accepts \`"indeterminate"\`.  
No separate \`indeterminate\` prop is needed.
        `,
      },
    },
  },
};

/* 5 ───────────────────────────── Disabled States ─────────────────────────── */

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {[
        { label: 'Unchecked, disabled', value: false },
        { label: 'Checked, disabled', value: true },
        { label: 'Indeterminate, disabled', value: 'indeterminate' as const },
      ].map(({ label, value }, i) => (
        <div key={i} className="flex items-center gap-2">
          <Checkbox id={`d${i}`} checked={value} disabled />
          <Label htmlFor={`d${i}`} className="text-muted-foreground">
            {label}
          </Label>
        </div>
      ))}
    </div>
  ),
};

/* 6 ───────────────────────────── With React-Hook-Form ─────────────────────── */

interface FormData {
  legal: boolean;
  marketing: boolean;
}

export const WithReactHookForm: Story = {
  name: 'Inside react-hook-form',
  render: () => {
    const { handleSubmit, control, watch } = useForm<FormData>({
      defaultValues: { legal: false, marketing: true },
    });
    const values = watch();

    return (
      <form onSubmit={handleSubmit(d => alert(JSON.stringify(d, null, 2)))} className="space-y-4">
        <fieldset className="space-y-2">
          {(
            [
              { name: 'legal', label: 'I agree to the Terms of Service *' },
              { name: 'marketing', label: 'Send me product news' },
            ] as const
          ).map(({ name, label }) => (
            <div key={name} className="flex items-center gap-2">
              <Controller
                name={name}
                control={control}
                render={({ field }) => <Checkbox id={name} checked={field.value} onCheckedChange={field.onChange} />}
              />
              <Label htmlFor={name}>{label}</Label>
            </div>
          ))}
        </fieldset>

        <Button size="sm" type="submit">
          Submit
        </Button>

        <pre className="text-xs bg-muted p-3 rounded-md">{JSON.stringify(values, null, 2)}</pre>
      </form>
    );
  },
};

/* 7 ───────────────────────────── Custom Icon / Theme ─────────────────────── */

export const CustomIcon: Story = {
  render: args => (
    <div className="flex items-center gap-2">
      <Checkbox
        {...args}
        id="brand"
        className="data-[state=checked]:bg-emerald-600
                   data-[state=checked]:text-emerald-50"
      >
        <CheckIcon className="h-3.5 w-3.5 stroke-[3]" />
      </Checkbox>
      <Label htmlFor="brand">Brand-coloured checkbox</Label>
    </div>
  ),
  args: { checked: true },
  parameters: {
    docs: {
      description: {
        story:
          'Pass children to override the default indicator. ' +
          'Combine with Tailwind `data-[state=*]` selectors for theming.',
      },
    },
  },
};

/* 8 ───────────────────────────────── Playground ──────────────────────────── */

export const Playground: Story = {
  args: {
    checked: true,
    disabled: false,
  },

  render: args => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} id="play" />
      <Label htmlFor="play">Play with the controls panel →</Label>
    </div>
  ),

  parameters: {
    docs: { description: { story: 'Interactive sandbox.' } },
  },
};
