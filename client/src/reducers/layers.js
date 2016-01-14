/**
 * Created by shaunwest on 9/27/15.
 */

import { Map, List } from 'immutable';
import { SELECT_LAYER, TOGGLE_LAYER, ADD_TILE,
  REMOVE_TILE, FILL_TILES, UPDATE_TILE } from './layers-actions.js';
import { INIT_LAYERS } from './levels-actions.js';
import layer from './layer.js';
import { create } from '../lib/rendering-grid.js';

export default function layers(state = Map({
}), action = {}) {
  switch (action.type) {
    // should logic happen here at all? like the grid create() function? probably not?
/*
    case INIT_LAYERS:
      return state.mergeIn(['items'],
        action.layers.reduce((items, data) => {
          return items.set(data.id, layer(Map({
            id: data.id,
            width: data.width,
            height: data.height,
            tileSize: data.tileSize,
            renderMode: data.renderMode,
            grid: create(data.width, data.height)
          })));
        }, state.get('items'))
      );
*/
/*
    case INIT_LAYERS:
      return state.mergeIn(['items'],
        action.layers.reduce((items, data) => {
          return items.set(data.id, data);
        }, state.get('items'))
      );
*/
    case INIT_LAYERS:
      return state.merge(action.layers);

/*
    case ADD_TILE:
    case REMOVE_TILE:
    case FILL_TILES:
    case UPDATE_TILES:
    case UPDATE_TILE:
      return state.mergeIn(
        ['items', action.layerId],
        layer(state.getIn(['items', action.layerId]), action)
      );
*/
    default:
      return state;
  }
}
