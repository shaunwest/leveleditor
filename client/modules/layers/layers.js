/**
 * Created by shaunwest on 9/27/15.
 */

import { Map, List } from 'immutable';
import { SELECT_LAYER, TOGGLE_LAYER, ADD_TILE,
  REMOVE_TILE, FILL_TILES, UPDATE_TILE, UPDATE_TILES } from './layers-actions.js';
import { INIT_LAYERS } from '../levels/levels-actions.js';
import layer from './layer.js';
import { create } from '../../lib/rendering-grid.js';

export default function layers(state = Map({
  items: Map()
}), action = {}) {
  switch (action.type) {
    case INIT_LAYERS:
      return state.merge({
        items: action.layers.reduce((acc, data) => {
          acc[data.id] = layer(Map({
            visible: true,
            id: data.id,
            width: data.width,
            height: data.height,
            tileSize: data.tileSize,
            renderMode: data.renderMode,
            grid: create(data.width, data.height)
          }));
          return acc;
        }, {})
      });
    case SELECT_LAYER:
      return state.set('activeLayerId', action.layerId);
    case TOGGLE_LAYER:
      return state.mergeIn(
        ['items', action.layerId],
        layer(state.getIn(['items', action.layerId]), action)
      );
    case ADD_TILE:
    case REMOVE_TILE:
    case FILL_TILES:
    case UPDATE_TILES:
    case UPDATE_TILE:
      return state.mergeIn(
        ['items', action.layerId],
        layer(state.getIn(['items', action.layerId]), action)
      );
    default:
      return state;
  }
}
