import type { Meta, StoryObj } from '@storybook/react';
import { UseMomentaryBoolExample } from '../components/UseMomentaryBoolExample';

// === Setup ===
const StoryComponent = UseMomentaryBoolExample; // <-- Set to your component
const meta: Meta<typeof StoryComponent> = {
  title: 'Stories/useMomentaryBool', // <-- Set to your story title
  component: StoryComponent,
  parameters: {
    options: { showPanel: false }, // Don't show addons panel
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

// === Stories ===
export const Example: Story = {};
