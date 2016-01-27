/**
 * Created by shaunwest on 9/27/15.
 */

import { Map, List } from 'immutable';
import { SELECT_LAYER, TOGGLE_LAYER, REMOVE_TILE, 
  FILL_TILES, UPDATE_TILE, UPDATE_TILES } from '../actions/layers.js';
import { INIT_LAYERS } from '../actions/levels.js';
//import { create } from '../lib/rendering-grid.js';

export default function layers(state = Map({
}), action = {}) {
  switch (action.type) {
    case INIT_LAYERS:
      return state.merge(action.layers);
    case REMOVE_TILE:
      return state.setIn([action.layerId, 'layout', action.tileIndex], undefined);
    case UPDATE_TILE:
      return state.setIn([action.layerId, 'layout', action.tileIndex], action.tileId);
    case FILL_TILES:
    case UPDATE_TILES:
      return state.mergeIn([action.layerId, 'layout'], action.tiles);
    default:
      return state;
  }
}
