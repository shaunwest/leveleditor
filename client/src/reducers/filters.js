/**
 * Created by shaunwest on 1/09/16.
 */

import { Map, List } from 'immutable';
import { INIT_LAYERS } from '../actions/levels.js';
import { TOGGLE_LAYER, SELECT_LAYER } from '../actions/filters.js';
import { RECEIVE_ROUTE } from '../actions/routes.js';
import { SELECTED_TOOL } from '../actions/tools.js';
import { SELECT_TILE, MADE_TILES, SELECTED_TILE_SHEET } from '../actions/tile-sheets.js';

export default function filters(state = Map({
  activeLayerId: 0,
  activeTileSetId: 0,
  selectedToolId: 'tileBrush', // TODO: rename to active?
  selectedTileIndex: 0,
  layerVisibility: Map({})
}), action = {}) {
  switch (action.type) {
    case RECEIVE_ROUTE:
      const levelId = action.context.params.levelId;
      return (levelId) ?
        state.set('currentLevelId', levelId) :
        state;
    case INIT_LAYERS:
      const newVisibility = Object.keys(action.layers).reduce((layerVisibility, layerId) => {
        return layerVisibility.set(layerId, true);
      }, state.get('layerVisibility'));
      return state.set('layerVisibility', newVisibility);
    case TOGGLE_LAYER:
      return state.setIn(['layerVisibility', action.layerId], action.visible);
    case SELECT_LAYER:
      return state.set('activeLayerId', action.layerId);
    case SELECTED_TOOL:
      return state.set('selectedToolId', action.id);
    case SELECTED_TILE_SHEET:
      return state.set('activeTileSetId', action.id);
    case MADE_TILES:
      return state.set('selectedTileIndex', 0);
    case SELECT_TILE:
      return state.set('selectedTileIndex', action.tileIndex);
    default:
      return state;
  }
}
