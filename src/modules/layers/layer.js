/**
 * Created by shaunwest on 9/27/15.
 */

import { Map } from 'immutable';
import { SELECT_LAYER, TOGGLE_LAYER, ADD_TILE,
  REMOVE_TILE, FILL_TILES, UPDATE_TILES } from './layers-actions.js';
import { SELECT_LEVEL } from '../levels/levels-actions.js';

export default function layer(state = Map({
  tiles: []
}), action = {}) {
  switch (action.type) {
    case TOGGLE_LAYER:
      return state.set('visible', action.visible);
    case ADD_TILE:
      return state.setIn(['tiles', action.index], action.id);
    case REMOVE_TILE:
      return state.setIn(['tiles', action.index], undefined);
    case FILL_TILES:
      return state.merge({tiles: action.tiles});
    case UPDATE_TILES:
      return state.merge({tiles: action.tiles});
    default:
      return state;
  }
}
