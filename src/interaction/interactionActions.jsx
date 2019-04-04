import Request from '../core/fetch_helpers';
import {
  INTERACTION_ADD,
  INTERACTION_LIKE_START,
  INTERACTION_LIKE_RECEIVED,
  INTERACTION_LIKE_ERROR,
  likeUrl,
} from './interactionInit';

/*
 * action creators
 */
export function add(data) {
  return { type: INTERACTION_ADD, payload: data };
}

export function likeStart(id) {
  return { type: INTERACTION_LIKE_START, payload: id };
}

export function likeSuccess(id, data) {
  return { type: INTERACTION_LIKE_RECEIVED, payload: { id, ...data } };
}

export function likeError(id, error) {
  return { type: INTERACTION_LIKE_ERROR, payload: { id, ...error } };
}

export function syncLike(id, articlePath, method) {
  return (dispatch) => {
    dispatch(likeStart(id));

    return Request.fetch(likeUrl(articlePath, id), method)
      .then((responseJson) => {
        dispatch(likeSuccess(id, responseJson));
      })
      .catch((error) => {
        dispatch(likeError(id, error));
      });
  };
}

export function fetch(articlePath, id) {
  return syncLike(id, articlePath, 'get');
}

export function toggleLike(articlePath, id, isLiked) {
  const method = isLiked ? 'put' : 'delete';

  return syncLike(id, articlePath, method);
}
