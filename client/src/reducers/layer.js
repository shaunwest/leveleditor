/**
 * Created by shaunwest on 9/27/15.
 */

import { Map } from 'immutable';
import { ADD_TILE, REMOVE_TILE,
  FILL_TILES, UPDATE_TILE } from './layers-actions.js';

// add an INIT_LAYERS case so this layer can
// initialize itself
export default function layer(state = Map({
  sprites: [],
  grid: []
}), action = {}) {
  switch (action.type) {
    //case INIT_LAYERS:
    //  action.layers.filter(layer => 
    case ADD_TILE:
      return state.setIn(['sprites', action.index], action.id);
    case REMOVE_TILE:
      return state.setIn(['sprites', action.index], undefined);
    case UPDATE_TILE:
      return state.setIn(['sprites', action.index], action.tileId);
    case FILL_TILES:
    /*case UPDATE_TILES:
      return state.merge({sprites: action.sprites});*/
    default:
      return state;
  }
}
