import React from 'react';
import { cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';
import renderWithRedux from '../../core/testHelper';
import { likeUrl } from '../interactionInit';
import '../../core/fetch_helpers';
import { InteractionContainer } from '../interactionContainer';
import * as actions from '../interactionActions';

jest.mock('../../core/fetch_helpers');
jest.mock('../interactionInit');

const spyToggleLike = jest.spyOn(actions, 'toggleLike');
const spyAdd = jest.spyOn(actions, 'add');
const spyFetch = jest.spyOn(actions, 'fetch');

const id = '1';
const path = '/likes_path';
const numberOfComments = 5;
const numberOfLikes = 3;
const props = {
  id,
  path,
  actions,
  numberOfComments,
  numberOfLikes,
};

beforeEach(() => {
  likeUrl.mockReturnValueOnce('../');
});

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

describe('Interaction', () => {
  it('should render with custom props.', () => {
    const { getByTestId } = renderWithRedux(
      <InteractionContainer {...props} />,
    );

    const comments = getByTestId('comments');
    const likes = getByTestId('likes');

    expect(comments).toHaveTextContent(numberOfComments);
    expect(likes).toHaveTextContent(numberOfLikes);
    expect(likes).not.toHaveClass('interaction__likes--active');

    expect(spyAdd).toHaveBeenCalledTimes(1);
    expect(spyAdd).toHaveBeenCalledWith({ ...props, fetched: false, liked: false });

    expect(spyFetch).toHaveBeenCalledTimes(1);
    expect(spyFetch).toHaveBeenCalledWith(path, id);

    fireEvent.click(likes);

    expect(spyToggleLike).toHaveBeenCalledTimes(1);
    expect(spyToggleLike).toHaveBeenCalledWith(path, id, true);
  });

  it('should not fetch interaction data on mount if already fetched.', () => {
    renderWithRedux(
      <InteractionContainer {...props} fetched />,
    );

    expect(spyFetch).not.toHaveBeenCalled();
  });
});
