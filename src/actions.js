/**
 * Created by shaunwest on 8/23/15.
 */

import 'isomorphic-fetch';

// LEVELS
export const REQUEST_LEVELS = 'REQUEST_LEVELS';

export function requestLevels(src) {
  return {
    type: REQUEST_LEVELS,
    src: src
  };
}

export const RECEIVE_LEVELS = 'RECEIVE_LEVELS';

export function receiveLevels(src, json) {
  return {
    type: RECEIVE_LEVELS,
    src: src,
    levels: json,
    receivedAt: Date.now()
  };
}


// LEVEL
export const SELECT_LEVEL = 'SELECT_LEVEL';

export function selectLevel(src) {
  return {
    type: SELECT_LEVEL,
    src: src
  };
}

export const REQUEST_LEVEL = 'REQUEST_LEVEL';

export function requestLevel(src) {
  return {
    type: REQUEST_LEVEL,
    src: src
  };
}

export const RECEIVE_LEVEL = 'RECEIVE_LEVEL';

export function receiveLevel(src, json) {
  return {
    type: RECEIVE_LEVEL,
    src: src,
    level: json,
    receivedAt: Date.now()
  };
}

export function fetchLevels(src) {
  return dispatch => {
    dispatch(requestLevels(src));
    return fetch(src)
      .then(response => response.json())
      .then(json => dispatch(receiveLevels(src, json)));
  };
}

