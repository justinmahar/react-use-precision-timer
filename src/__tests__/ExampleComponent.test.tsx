import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import { ExampleComponent, ExampleComponentProps } from '../components/ExampleComponent';

// Learn how to test React components:
// https://testing-library.com/docs/react-testing-library/intro

function renderComponent(props: ExampleComponentProps, children: React.ReactNode = undefined): RenderResult {
  return render(<ExampleComponent {...props}>{children}</ExampleComponent>);
}

describe('ExampleComponent', () => {
  test('should render without crashing', async () => {
    const props: ExampleComponentProps = {};
    const children: React.ReactNode = undefined;
    const renderResult = renderComponent(props, children);
    expect(renderResult.container).toBeInTheDocument();
  });
});
