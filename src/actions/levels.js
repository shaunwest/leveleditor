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

export const RECEIVE_LEVELS_ERROR = 'RECEIVE_LEVELS_ERROR';

export function receiveLevelsError(src, json) {
  return {
    type: RECEIVE_LEVELS_ERROR,
    src: src,
    error: json,
    receivedAt: Date.now()
  };
}

// LEVEL

// selectLevel currently does nothing
// because level selection is handled
// by a hyperlink and the router
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

export const RECEIVE_LEVEL_ERROR = 'RECEIVE_LEVEL_ERROR';

export function receiveLevelError(src, json) {
  return {
    type: RECEIVE_LEVEL_ERROR,
    src: src,
    error: json,
    receivedAt: Date.now()
  };
}


// FETCH

export function fetchAll(src) {
  return (dispatch, getState) => {
    return dispatch(fetchLevels(src))
      .then(action => {
        getState()
          .levels
          .get('items')
          .toSeq()
          .forEach((level, src) => {
            dispatch(fetchLevel(src));
          });
      });
  }
}

export function fetchLevels(src) {
  return dispatch => {
    dispatch(requestLevels(src));
    return fetch(src)
      .then(
        response => response.json(),
        response => response.text()
      )
      .then(
        json => dispatch(receiveLevels(src, json)),
        json => dispatch(receiveLevelsError(src, json))
      );
  };
}

export function fetchLevel(src) {
  return dispatch => {
    dispatch(requestLevel(src));
    return fetch('/data/' + src + '.json')
      .then(
        response => response.json(),
        response => response.text()
      )
      .then(
        json => dispatch(receiveLevel(src, json)),
        json => dispatch(receiveLevelError(src, json))
      );
  };
}



