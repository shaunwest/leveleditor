/**
 * Created by shaunwest on 11/16/15.
 */

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
    src,
    error: json,
    receivedAt: Date.now()
  };
}

// LEVEL

export const INIT_LAYERS = 'INIT_LAYERS';

export function initLayers(layers) {
  return {
    type: INIT_LAYERS,
    layers
  };
}

export const REQUEST_LEVEL = 'REQUEST_LEVEL';

export function requestLevel(src) {
  return {
    type: REQUEST_LEVEL,
    src
  };
}

export const RECEIVE_LEVEL = 'RECEIVE_LEVEL';

export function receiveLevel(src, level) {
  return {
    type: RECEIVE_LEVEL,
    src,
    level,
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
