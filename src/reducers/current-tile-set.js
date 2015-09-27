/**
 * Created by shaunwest on 9/7/15.
 */

import { Map } from 'immutable';
import {
  SELECTED_TILE_SHEET, SELECT_TILE
  } from '../actions/tile-sheets.js';
import { ADD_TILE } from '../actions/layer.js';

const DEFAULT_THUMB = 'default-thumbnail.png';

export default function currentTileSet(state = Map({
  tileImages: Map()
}), action = {}) {
  switch (action.type) {
    case SELECTED_TILE_SHEET:
      return state.set('tileImages', action.tileImages);
    case SELECT_TILE:
      return state.set('currentTileIndex', action.tileIndex);
    case ADD_TILE:
      return state.setIn(['items', action.src, 'layers', 0, 'tiles', action.index], action.id);
    default:
      return state;
  }
}
