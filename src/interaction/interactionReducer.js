import {
  INTERACTION_ADD,
  INTERACTION_LIKE_START,
  INTERACTION_LIKE_RECEIVED,
  INTERACTION_LIKE_ERROR,
} from './interactionInit';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case INTERACTION_ADD: {
      const newState = JSON.parse(JSON.stringify(state));

      if (action.payload.id && !newState[action.payload.id]) {
        newState[action.payload.id] = action.payload;
      }

      return newState;
    }
    case INTERACTION_LIKE_START: {
      const newState = JSON.parse(JSON.stringify(state));

      if (newState[action.payload.id]) {
        newState[action.payload.id].fetching = true;
      }

      return newState;
    }

    case INTERACTION_LIKE_RECEIVED: {
      const newState = JSON.parse(JSON.stringify(state));

      newState[action.payload.id].liked = action.payload.liked;
      newState[action.payload.id].numberOfComments = action.payload.numberOfComments;
      newState[action.payload.id].numberOfLikes = action.payload.numberOfLikes;
      newState[action.payload.id].fetching = false;
      newState[action.payload.id].fetched = true;

      return newState;
    }

    case INTERACTION_LIKE_ERROR: {
      const newState = JSON.parse(JSON.stringify(state));

      newState[action.payload.id].fetching = false;
      newState[action.payload.id].fetched = true;

      return newState;
    }

    default:
      return state;
  }
};

export default reducer;

export const getInteraction = (state, props) => (
  state.interaction[props.id] ? state.interaction[props.id] : props);
