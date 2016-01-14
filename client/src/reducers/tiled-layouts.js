/**
 * Created by shaunwest on 1/10/16.
 */

import { Map } from 'immutable';
import { INIT_TILED_LAYOUTS, UPDATE_TILES, ADD_TILE, REMOVE_TILE,
  FILL_TILES, UPDATE_TILE} from './tiled-layouts-actions.js';

export default function tiledLayouts(state = Map({
}), action = {}) {
  switch (action.type) {
    case INIT_TILED_LAYOUTS:
      return state.merge(action.layouts);
    case ADD_TILE:
      return state.setIn([action.layoutId, action.index], action.id);
    case REMOVE_TILE:
      return state.setIn([action.layoutId, action.index], undefined);
    case UPDATE_TILE:
      return state.setIn([action.layoutId, action.index], action.tileId);
    case FILL_TILES:
    case UPDATE_TILES:
      return state.mergeIn([action.layoutId], action.layout);
    default:
      return state;
  }
}
