/**
 * Created by shaunwest on 9/7/15.
 */

import { Map } from 'immutable';
import {
  REQUEST_TILE_SHEETS, RECEIVE_TILE_SHEETS, SELECT_TILE_SHEET,
  REQUEST_TILE_SHEET, RECEIVE_TILE_SHEET, RECEIVE_TILE_SHEET_ERROR
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
      return state.mergeDeep({
        isFetching: false,
        items: action.tileSheets,
        lastUpdated: action.receivedAt
      });
    case REQUEST_TILE_SHEET:
      return state.setIn(['items', action.src], { isFetching: true });
    case RECEIVE_TILE_SHEET:
      return state.mergeDeepIn(['items', action.src], { isFetching: false }, action.tileSheet);
    case RECEIVE_TILE_SHEET_ERROR:
      return state.setIn(['items', action.src], {
        isFetching: false,
        isError: true,
        thumbnail: DEFAULT_THUMB
      });
    default:
      return state;
  }
}