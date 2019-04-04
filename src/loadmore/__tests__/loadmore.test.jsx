import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';
import LoadMore from '../loadmore';

const onClickMock = jest.fn(() => 'clicked');

beforeEach(() => {
  onClickMock.mockClear();
});
afterEach(cleanup);

describe('Load More', () => {
  test('should not be rendered if not needed.', () => {
    const { container } = render(<LoadMore loadMore={onClickMock} />);

    expect(container).toBeEmpty();
  });

  test('should be created with default properties.', () => {
    const { getByTestId } = render(<LoadMore show loadMore={onClickMock} />);
    const button = getByTestId('button');

    expect(button).toHaveTextContent('Load More');
    expect(button).toHaveClass('button');
    expect(button).not.toHaveClass('button--active');
  });

  test('should be disabled in fetching state.', () => {
    const { getByTestId } = render(<LoadMore show fetching title="Get me more of those" loadMore={onClickMock} />);
    const button = getByTestId('button');

    fireEvent.click(button);

    expect(button).toHaveClass('button--active');
    expect(button).toHaveTextContent('Get me more of those');
    expect(button).toBeDisabled();
    expect(onClickMock).toHaveBeenCalledTimes(0);
  });

  test('should trigger an action on button click.', () => {
    const { getByTestId } = render(<LoadMore show loadMore={onClickMock} />);
    const button = getByTestId('button');

    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(onClickMock).toHaveReturnedWith('clicked');
  });
});
