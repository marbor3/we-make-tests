import 'jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Request from '../../core/fetch_helpers';
import { likeUrl } from '../interactionInit';
import * as actions from '../interactionActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../core/fetch_helpers');
jest.mock('../interactionInit');

beforeEach(() => {
  likeUrl.mockReturnValueOnce('../');
  Request.fetch.mockResolvedValue({});
});

describe('Interaction', () => {
  it('should create an action to add an interaction.', () => {
    const initialState = {};
    const store = mockStore(initialState);

    store.dispatch(actions.add());

    const triggeredActions = store.getActions();
    const expectedPayload = { type: 'INTERACTION_ADD' };

    expect(triggeredActions).toEqual([expectedPayload]);
  });

  it('should fetch data .', () => {
    const store = mockStore({});

    return store.dispatch(actions.syncLike('1', '../path', 'fetch'))
      .then(() => {
        const triggeredActions = store.getActions();

        expect(triggeredActions[0]).toEqual(actions.likeStart('1'));
      });
  });
});
