/**
 * Created by shaunwest on 8/23/15.
 */

import { DATA_PATH } from '../paths.js';
import { requestLevels, receiveLevels, receiveLevelsError,
  requestLevel, receiveLevel, receiveLevelError,
  initLayers, initLayer } from '../reducers/levels-actions.js';
import { initTiledLayouts } from '../reducers/tiled-layouts-actions.js';
import { selectLayer } from '../reducers/layers-actions.js';
import { updateTiles } from '../reducers/tiled-layouts-actions.js';
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
    const tiledLayouts = level.tiledLayouts;

    dispatch(initLayers(level.layers));
    dispatch(initTiledLayouts(tiledLayouts));
    
    Object.keys(tiledLayouts).forEach((layoutId) => {
      dispatch(updateTiles(layoutId, tiledLayouts[layoutId]));
    });

    // FIXME
    /*Object.keys(level.layers).forEach((layerId) => {
      dispatch(updateTiles(layerId, tiledLayouts[]));
    });*/

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
