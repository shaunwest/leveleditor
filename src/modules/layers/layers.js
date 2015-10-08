/**
 * Created by shaunwest on 9/27/15.
 */

import { Map } from 'immutable';
import { ADD_TILE, REMOVE_TILE } from './update-layer.js';
import { SELECT_LEVEL } from '../levels/fetch-levels.js';

export default function layers(state = Map({
  items: Map()
}), action = {}) {
  const activeIndex = state.get('activeLayerIndex');

  switch (action.type) {
    case SELECT_LEVEL:
      return state.merge({
        items: action.level.layers,
        activeLayerIndex: 0
      });
    case ADD_TILE:
      return state.setIn(['items', activeIndex, 'tiles', action.index], action.id);
    case REMOVE_TILE:
      return state.setIn(['items', activeIndex, 'tiles', action.index], undefined);
    default:
      return state;
  }
}
