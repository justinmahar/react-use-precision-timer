import type { Meta, StoryObj } from '@storybook/react';
import { UseDelayExample } from '../components/UseDelayExample';

// === Setup ===
const StoryComponent = UseDelayExample; // <-- Set to your component
const meta: Meta<typeof StoryComponent> = {
  title: 'Stories/useDelay', // <-- Set to your story title
  component: StoryComponent,
  parameters: {
    options: { showPanel: false }, // Don't show addons panel
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

// === Stories ===

export const Example: Story = {};
