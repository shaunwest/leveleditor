/**
 * Created by shaunwest on 9/27/15.
 */

import { Map, List } from 'immutable';
import { SELECT_LAYER, TOGGLE_LAYER, REMOVE_TILE, 
  FILL_TILES, UPDATE_TILE, UPDATE_TILES } from '../actions/layers.js';
import { INIT_LAYERS } from '../actions/levels.js';
//import { create } from '../lib/rendering-grid.js';

export default function layers(state = {
}, action = {}) {
  switch (action.type) {
    case INIT_LAYERS:
      return action.layers;
    case REMOVE_TILE:
      state[action.layerId]['layout'][action.tileIndex] = undefined;
      return state;
    case UPDATE_TILE:
      state[action.layerId]['layout'][action.tileIndex] = action.tileId;
      return state;
    case FILL_TILES:
    case UPDATE_TILES:
      state[action.layerId]['layout'] = action.tiles;
      return state;
    default:
      return state;
  }
}
