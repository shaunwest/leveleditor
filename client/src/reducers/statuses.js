/**
 * Created by shaunwest on 1/09/16.
 */

import { Map } from 'immutable';

import { REQUEST_LEVELS, RECEIVE_LEVELS,
  REQUEST_LEVEL, RECEIVE_LEVEL, RECEIVE_LEVEL_ERROR
  } from '../actions/levels.js';

import {
  REQUEST_TILE_SHEETS, RECEIVE_TILE_SHEETS,
  REQUEST_TILE_SHEET, RECEIVE_TILE_SHEET, RECEIVE_TILE_SHEET_ERROR,
  REQUEST_TILE_SHEET_IMAGE, RECEIVE_TILE_SHEET_IMAGE
  } from '../actions/tile-sheets.js';

export default function statuses(state = Map({
  tileSheetsList: Map(),
  tileSheets: Map(),
  levelsList: Map(),
  levels: Map()
}), action = {}) {
  switch (action.type) {
    case REQUEST_LEVELS:
      return state.setIn(['levelsList', 'isFetching'], true);
    case RECEIVE_LEVELS:
      return state.mergeIn(['levelsList'], {
        isFetching: false,
        lastUpdated: action.receivedAt
      });
    case REQUEST_LEVEL:
      return state.mergeIn(['levels', action.src], { isFetching: true });
    case RECEIVE_LEVEL:
      return state.mergeIn(['levels', action.src], {
        isFetching: false,
        lastUpdated: action.receivedAt
      });
    case RECEIVE_LEVEL_ERROR:
      return state.mergeIn(['levels', action.src], {
        isFetching: false,
        isError: true,
        lastUpdated: action.receivedAt
      });
    case REQUEST_TILE_SHEETS:
      return state.setIn(['tileSheetsList', 'isFetching'], true);
    case RECEIVE_TILE_SHEETS:
      return state.mergeIn(['tileSheetsList'], {
        isFetching: false,
        lastUpdated: action.receivedAt
      });
    case REQUEST_TILE_SHEET:
      return state.mergeIn(['tileSheets', action.src], { isFetching: true });
    case RECEIVE_TILE_SHEET:
      return state.mergeIn(['tileSheets', action.src], {
        isFetching: false,
        lastUpdated: action.receivedAt
      });
    case RECEIVE_TILE_SHEET_ERROR:
      return state.mergeIn(['tileSheets', action.src], {
        isFetching: false,
        isError: true,
        lastUpdated: action.receivedAt
      });
    case REQUEST_TILE_SHEET_IMAGE:
      return state.mergeIn(['tileSheets', action.src], { 
        image: {isFetching: true}
      });
    case RECEIVE_TILE_SHEET_IMAGE:
      return state.mergeIn(['tileSheets', action.src], { 
        image: {
          isFetching: false,
          lastUpdated: action.receivedAt 
        }
      });
    default:
      return state;
  }
}
