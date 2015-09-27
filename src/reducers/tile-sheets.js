/**
 * Created by shaunwest on 9/7/15.
 */

import { Map } from 'immutable';
import {
  REQUEST_TILE_SHEETS, RECEIVE_TILE_SHEETS, SELECT_TILE_SHEET,
  REQUEST_TILE_SHEET, RECEIVE_TILE_SHEET, RECEIVE_TILE_SHEET_ERROR,
  REQUEST_TILE_SHEET_IMAGE, RECEIVE_TILE_SHEET_IMAGE,
  MADE_TILES, SELECT_TILE
  } from '../actions/tile-sheets.js';

const DEFAULT_THUMB = 'default-thumbnail.png';

export default function tileSheets(state = Map({
  isFetching: false,
  items: Map()
}), action = {}) {
  switch (action.type) {
    case REQUEST_TILE_SHEETS:
      return state.set('isFetching', true);
    case RECEIVE_TILE_SHEETS:
      return state.merge({
        isFetching: false,
        items: action.tileSheets,
        lastUpdated: action.receivedAt,
        currentTileSheetId: action.defaultId
      });
    case REQUEST_TILE_SHEET:
      return state.mergeIn(['items', action.src], { isFetching: true });
    case RECEIVE_TILE_SHEET:
      return state.mergeIn(['items', action.src], { isFetching: false }, action.tileSheet);
    case RECEIVE_TILE_SHEET_ERROR:
      return state.mergeIn(['items', action.src], {
        isFetching: false,
        isError: true,
        thumbnail: DEFAULT_THUMB
      });
    case REQUEST_TILE_SHEET_IMAGE:
      return state.mergeIn(['items', action.src], { isFetching: true });
    case RECEIVE_TILE_SHEET_IMAGE:
      return state.mergeIn(['items', action.src], { isFetching: false, image: action.image });
    case MADE_TILES:
      return state.mergeDeepIn(['items', action.src], { tileImages: action.tileImages });
    /*case SELECT_TILE_SHEET:
      return state.set('currentTileSheetId', action.id);
    case SELECT_TILE:
      return state.set('currentTileIndex', action.tileIndex);*/
    default:
      return state;
  }
}
