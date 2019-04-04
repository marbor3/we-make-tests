import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import Button from '../button';

afterEach(cleanup);

describe('Button', () => {
  test('should be created with default text.', () => {
    const { container } = render(<Button />);

    expect(container).toHaveTextContent('Button');
  });

  test('should be created with the text given.', () => {
    const { container } = render(<Button title="Hello" />);

    expect(container).toHaveTextContent('Hello');
  });
});
