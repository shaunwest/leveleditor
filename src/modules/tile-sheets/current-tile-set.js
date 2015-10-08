/**
 * Created by shaunwest on 9/7/15.
 */

import { Map } from 'immutable';
import {
  SELECTED_TILE_SHEET, SELECT_TILE, MADE_TILES
  } from './fetch-tile-sheets.js';

export default function currentTileSet(state = Map({
  tileImages: Map()
}), action = {}) {
  switch (action.type) {
    case SELECTED_TILE_SHEET:
      return state.set('tileSetId', action.id);
    case MADE_TILES:
      return state.merge({currentTileIndex: 0, tileImages: action.tileImages});
    case SELECT_TILE:
      return state.set('currentTileIndex', action.tileIndex);
    default:
      return state;
  }
}
