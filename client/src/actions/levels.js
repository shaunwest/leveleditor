/**
 * Created by shaunwest on 11/16/15.
 */

import { DATA_PATH } from '../paths.js';
import { selectLayer } from './filters.js';
import { updateTiles } from './layers.js'; 
import 'isomorphic-fetch';


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

export function fetchAll(src) {
  return (dispatch, getState) => {
    return dispatch(fetchLevels(src))
      .then(action => {
        getState()
          .get('levels')
          .toSeq()
          .forEach((level, src) => {
            dispatch(fetchLevel(src));
          });
      });
  };
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
    return fetch(DATA_PATH + src + '.json')
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

export function selectLevel(level) {
  return dispatch => {
    //const tiledLayouts = level.tiledLayouts;

    dispatch(initLayers(level.layers));

    console.log('TODO', 'layer stuff!');
    // dispatch(initTiledLayouts(tiledLayouts));

    // FIXME    
    /*Object.keys(tiledLayouts).forEach((layoutId) => {
      dispatch(updateTiles(layoutId, tiledLayouts[layoutId]));
    });
    */

    /* DO I NEED THIS???
    Object.keys(level.layers).forEach((layerId) => {
      dispatch(updateTiles(layerId, level.layers[layerId]));
    });
    */

    // FIXME: don't assume background
    return dispatch(selectLayer('background'));
  };
}

export function fetchAndSelectLevel(src) {
  return dispatch => {
    return dispatch(fetchLevel(src))
      .then(action => dispatch(selectLevel(action.level)));
  };
}
