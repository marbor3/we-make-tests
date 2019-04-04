import 'jest-dom/extend-expect';
import reducer, { getInteraction } from '../interactionReducer';
import {
  INTERACTION_ADD,
  INTERACTION_LIKE_START,
  INTERACTION_LIKE_RECEIVED,
  INTERACTION_LIKE_ERROR,
} from '../interactionInit';

describe('Interaction', () => {
  it('should return interaction data if it\'s in the store.', () => {
    const state = {
      interaction: {
        1: {
          foo: 'bar',
        },
      },
    };

    expect(getInteraction(state, { id: 1 })).toEqual({ foo: 'bar' });
  });

  it('should return props if interaction data is not in the store.', () => {
    const state = {
      interaction: {
        1: {
          foo: 'bar',
        },
      },
    };

    expect(getInteraction(state, { id: 2 })).toEqual({ id: 2 });
  });

  describe('when new item is send', () => {
    it('it should be added if not present.', () => {
      expect(reducer({}, {
        type: INTERACTION_ADD,
        payload: {
          id: '1',
          foo: 'bar',
        },
      })).toEqual({
        1: {
          id: '1',
          foo: 'bar',
        },
      });
    });

    it('it should not be changed if already present.', () => {
      expect(reducer({
        1: {
          id: '1',
          foo: 'bar',
        },
      }, {
        type: INTERACTION_ADD,
        payload: {
          id: '1',
          foo: 'baz',
        },
      })).toEqual({
        1: {
          id: '1',
          foo: 'bar',
        },
      });
    });

    it('it should not be changed if data doesn\'t contain an id.', () => {
      expect(reducer({}, {
        type: INTERACTION_ADD,
        payload: {
          foo: 'baz',
        },
      })).toEqual({});
    });

    it('it creates default state if it\'s undefined.', () => {
      expect(reducer(undefined, {
        type: INTERACTION_ADD,
        payload: {
          id: '1',
          foo: 'bar',
        },
      })).toEqual({
        1: {
          id: '1',
          foo: 'bar',
        },
      });
    });
  });

  describe('when fetch is triggered', () => {
    it('it should update fetching flag.', () => {
      expect(reducer({
        1: {
          id: '1',
          foo: 'bar',
          fetching: false,
        },
      }, {
        type: INTERACTION_LIKE_START,
        payload: {
          id: '1',
        },
      })).toEqual({
        1: {
          id: '1',
          foo: 'bar',
          fetching: true,
        },
      });
    });

    it('it should not update anything if item is not there.', () => {
      expect(reducer({
        1: {
          id: '1',
          foo: 'bar',
          fetching: false,
        },
      }, {
        type: INTERACTION_LIKE_START,
        payload: {
          id: '2',
        },
      })).toEqual({
        1: {
          id: '1',
          foo: 'bar',
          fetching: false,
        },
      });
    });
  });

  describe('when fetch is successful', () => {
    it('it should update the data.', () => {
      expect(reducer({
        1: {
          id: '1',
          fetching: true,
          fetched: false,
        },
      }, {
        type: INTERACTION_LIKE_RECEIVED,
        payload: {
          id: '1',
          liked: true,
          numberOfComments: '5',
          numberOfLikes: '3',
        },
      })).toEqual({
        1: {
          id: '1',
          fetching: false,
          fetched: true,
          liked: true,
          numberOfComments: '5',
          numberOfLikes: '3',
        },
      });
    });
  });

  describe('when fetch is not successful', () => {
    it('it should reset fetching flags.', () => {
      expect(reducer({
        1: {
          id: '1',
          fetching: true,
          fetched: false,
        },
      }, {
        type: INTERACTION_LIKE_ERROR,
        payload: {
          id: '1',
        },
      })).toEqual({
        1: {
          id: '1',
          fetching: false,
          fetched: true,
        },
      });
    });
  });
});
