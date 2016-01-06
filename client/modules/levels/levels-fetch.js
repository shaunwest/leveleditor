/**
 * Created by shaunwest on 8/23/15.
 */

import { DATA_PATH } from '../../paths.js';
import { requestLevels, receiveLevels, receiveLevelsError,
  requestLevel, receiveLevel, receiveLevelError,
  initLayers, initLayer } from './levels-actions.js';
import { updateTiles, selectLayer } from '../layers/layers-actions.js';
import 'isomorphic-fetch';

export function fetchAll(src) {
  return (dispatch, getState) => {
    return dispatch(fetchLevels(src))
      .then(action => {
        getState()
          .get('levels')
          .get('items')
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
    dispatch(initLayers(level.layers));

    level.layers.forEach((layer) => {
      dispatch(updateTiles(layer.id, layer.sprites));
    });
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
