/**
 * Created by shaunwest on 9/27/15.
 */

import { Map, List } from 'immutable';
import { SELECT_LAYER, TOGGLE_LAYER, ADD_TILE,
  REMOVE_TILE, FILL_TILES, UPDATE_TILES } from './layers-actions.js';
import { SELECT_LEVEL } from '../levels/levels-actions.js';
import layer from './layer.js';

export default function layers(state = Map({
  items: List(),
  activeLayerIndex: 0
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
      return state.mergeIn(
        ['items', action.index],
        layer(state.getIn(['items', action.index]), action)
      );
    case ADD_TILE:
    case REMOVE_TILE:
    case FILL_TILES:
    case UPDATE_TILES:
      return state.mergeIn(
        ['items', activeIndex],
        layer(state.getIn(['items', activeIndex]), action)
      );
    default:
      return state;
  }
}
