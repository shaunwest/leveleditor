/**
 * Created by shaunwest on 9/27/15.
 */

import { Map } from 'immutable';
import { ADD_TILE } from '../actions/layer.js';
import { SELECT_LEVEL } from '../actions/levels.js';

const DEFAULT_THUMB = 'default-thumbnail.png';

export default function layers(state = Map({
  items: Map()
}), action = {}) {
  switch (action.type) {
    case SELECT_LEVEL:
      return state.merge({
        items: action.level.layers,
        activeLayerIndex: 0
      });
    case ADD_TILE:
      const activeIndex = state.get('activeLayerIndex');
      return state.setIn(['items', activeIndex, 'tiles', action.index], action.id);
    default:
      return state;
  }
}
