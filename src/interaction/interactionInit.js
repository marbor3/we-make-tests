/*
 * action types
 */
export const INTERACTION_ADD = 'INTERACTION_ADD';
export const INTERACTION_LIKE_START = 'INTERACTION_LIKE_START';
export const INTERACTION_LIKE_RECEIVED = 'INTERACTION_LIKE_RECEIVED';
export const INTERACTION_LIKE_ERROR = 'INTERACTION_LIKE_ERROR';

export function likeUrl(path, id) {
  const url = `/bin/mvc.do/api/personalized/individual/activities/like?page=${path}&id=${id}`;
  const ts = Math.round((new Date()).getTime() / 1000);

  return `${window.clientContextDataService.personalizeUrl(url)}&timestamp=${ts}`;
}

export function commentsUrl(path) {
  return `${path}.html#comments`;
}
