# ShadcnUI-React-Vite-Storybook

ShadcnUI components for React and Vite with Storybook stories and tests

## Tech stack details

- Basic

  - Corepack + yarn
  - vite > 6
  - tailwind > 4
  - react > 19
  - shadcn > 2.5 with newyork style
  - icons (used in storybook): lucide-react

- Lint/Fmt

  - eslint > 9
  - prettier > 3.5
  - prettier-plugin-sort-imports > 5.2

- Storybook

  - For dev, docs and tests
  - No app for demo, use storybook for writing docs, maintaining component tests
  - Structure of stories:
    - Docs
    - Playground that exposes all props as controls
    - Feature stories that are proper feature demos with no controls
    - Recipes, if applicable
    - Interactive stories with play functions that double as tests

- CSS
  - A css bundle is also provided using tailwind.
  - A tailwind preset is NOT created as of now. Can be done by creating a preset/index.ts and modifying the package.json exports.

## Components not added

- Composite ones that are added as example in shadcn-ui docs
  - combobox
  - datatable
  - datepicker
  - toast - deprecated, use sooner

## Prompt for generating stories

- Always use Markdown format for output
- Tech stack: shadcn-ui 2.5, react 19, ts, lucide react icons, tailwind 4, vite 6, storybook 8 (jest and testing library utils merged into test)
- Properties and structure of stories should be

  - Title of story `ShadcnUI/<componentName>`
  - Docs should be always added. The docs should be such that the target user of it is the consumer of the component.
  - First a Playground story that exposes all props as controls properly so that it can be used to experiment properly.
  - Feature stories that are proper feature demos (like variants/prop combinations) with no controls. You can use: `parameters: { controls: { disable: true }}`, to disable controls for a single story.
  - Play function stories that can demo some interactivity and can be used as proper full-fledged component tests

- Try to cover all features and modification possibilities in stories.
- Try to cover as much as possible in component tests inside the storybook only. Don't give other files or separate tests.
- Always give full code back

Task: Add and Enhance stories and tests from current to match my tech stack and constraints above. Rectify if any bugs and ensure all interactions in tests are properly setup.
