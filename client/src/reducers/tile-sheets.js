/**
 * Created by shaunwest on 9/7/15.
 */

import { Map } from 'immutable';
import {
  RECEIVE_TILE_SHEETS,
  RECEIVE_TILE_SHEET, RECEIVE_TILE_SHEET_ERROR,
  RECEIVE_TILE_SHEET_IMAGE,
  MADE_TILES
  } from '../actions/tile-sheets.js';

const DEFAULT_THUMB = 'default-thumbnail.png';

export default function tileSheets(state = Map({
}), action = {}) {
  switch (action.type) {
    case RECEIVE_TILE_SHEETS:
      return state.merge(action.tileSheets);
    case RECEIVE_TILE_SHEET:
      return state.mergeIn([action.src], action.tileSheet);
    case RECEIVE_TILE_SHEET_ERROR:
      return state.mergeIn([action.src], {
        thumbnail: DEFAULT_THUMB
      });
    case RECEIVE_TILE_SHEET_IMAGE:
      return state.mergeIn([action.src], { image: action.image });
    case MADE_TILES:
      return state.mergeIn([action.src], { tileImages: action.tileImages });
    default:
      return state;
  }
}
