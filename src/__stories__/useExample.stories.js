import React from 'react';
import { useExample } from '../hooks/useExample';

// Learn how to write stories:
// https://storybook.js.org/docs/basics/writing-stories/

// A Storybook is a collection of stories. Each story represents a single visual state of a component.
// Technically, a story is a function that returns something that can be rendered to screen.

// The default export defines metadata that applies to the group.
export default {
  title: 'useExample Hook',
};

// The named exports define the stories

// Needed to wrap the hook and give it visual representation.
const HookComponent = () => {
  useExample();
  return <div>Add hook visual representation here.</div>;
};

export const ExampleStory = () => <HookComponent />;
ExampleStory.story = {
  name: 'Hook Visual',
};
