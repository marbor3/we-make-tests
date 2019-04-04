/*
 * npm run test -t interaction
 */
import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';
import Interaction from '../interaction';

const toggleLikeMock = jest.fn(() => 'clicked');
const dummyPath = '/comments_path';

beforeEach(() => {
  toggleLikeMock.mockClear();
});
afterEach(cleanup);

describe('Interaction', () => {
  test('should render with default props.', () => {
    const { getByTestId } = render(<Interaction path={dummyPath} toggleLike={toggleLikeMock} />);
    const comments = getByTestId('comments');
    const likes = getByTestId('likes');

    expect(comments).toHaveTextContent('0');
    expect(likes).toHaveTextContent('0');
    expect(likes).not.toHaveClass('interaction__likes--active');
  });

  test('should render with custom props.', () => {
    const { getByTestId } = render(
      <Interaction
        path={dummyPath}
        toggleLike={toggleLikeMock}
        numberOfComments={5}
        numberOfLikes={3}
        liked
      />,
    );
    const comments = getByTestId('comments');
    const likes = getByTestId('likes');

    expect(comments).toHaveTextContent('5');
    expect(likes).toHaveTextContent('3');
    expect(likes).toHaveClass('interaction__likes--active');
  });

  test('should trigger like action once on click.', () => {
    const { getByTestId } = render(<Interaction path={dummyPath} toggleLike={toggleLikeMock} />);
    const likes = getByTestId('likes');

    fireEvent.click(likes);

    expect(toggleLikeMock).toHaveBeenCalledTimes(1);
  });
});
