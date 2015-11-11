/**
 * Created by shaunwest on 9/27/15.
 */

import { Map } from 'immutable';
import { SELECT_LAYER, TOGGLE_LAYER, ADD_TILE, REMOVE_TILE, FILL_TILES } from './layers-actions.js';
import { SELECT_LEVEL } from '../levels/levels-fetch.js';

export default function layers(state = Map({
  items: Map()
}), action = {}) {
  const activeIndex = state.get('activeLayerIndex');

  switch (action.type) {
    case SELECT_LEVEL:
      return state.merge({
        items: action.level.layers.map(layer => {
          layer.visible = true;
          return layer;
        }),
        activeLayerIndex: 0
      });
    case SELECT_LAYER:
      return state.set('activeLayerIndex', action.index);
    case TOGGLE_LAYER:
      return state.setIn(['items', action.index, 'visible'], action.visible);
    case ADD_TILE:
      return state.setIn(['items', activeIndex, 'tiles', action.index], action.id);
    case REMOVE_TILE:
      return state.setIn(['items', activeIndex, 'tiles', action.index], undefined);
    case FILL_TILES:
      return state.mergeIn(['items', activeIndex, 'tiles'], action.tiles);
    default:
      return state;
  }
}
