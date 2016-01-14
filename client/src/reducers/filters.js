/**
 * Created by shaunwest on 1/09/16.
 */

import { Map, List } from 'immutable';
import { INIT_LAYERS } from './levels-actions.js';
import { TOGGLE_LAYER, SELECT_LAYER } from './filters-actions.js';

export default function filters(state = Map({
  activeLayerId: 0,
  activeTileSetId: 0,
  layerVisibility: Map({})
}), action = {}) {
  switch (action.type) {
    case INIT_LAYERS:
      const newVisibility = Object.keys(action.layers).reduce((layerVisibility, layerId) => {
        return layerVisibility.set(layerId, true);
      }, state.get('layerVisibility'));
      return state.set('layerVisibility', newVisibility);
    case TOGGLE_LAYER:
      return state.setIn(['layerVisibility', action.layerId], action.visible);
    case SELECT_LAYER:
      return state.set('activeLayerId', action.layerId);
    default:
      return state;
  }
}
