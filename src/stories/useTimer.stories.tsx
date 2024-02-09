import React from 'react';
import { UseTimerExample } from '../components/UseTimerExample';
import type { Meta, StoryObj } from '@storybook/react';

// === Setup ===
const StoryComponent = UseTimerExample; // <-- Set to your component
const meta: Meta<typeof StoryComponent> = {
  title: 'Stories/useTimer', // <-- Set to your story title
  component: StoryComponent,
  parameters: {
    options: { showPanel: false }, // Don't show addons panel
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

// === Stories ===
export const Example: Story = {};
