/**
 * Created by shaunwest on 9/7/15.
 */

import 'isomorphic-fetch';

// TILE SHEETS
export const REQUEST_TILE_SHEETS = 'REQUEST_TILE_SHEETS';

export function requestTileSheets(src) {
  return {
    type: REQUEST_TILE_SHEETS,
    src: src
  };
}

export const RECEIVE_TILE_SHEETS = 'RECEIVE_TILE_SHEETS';

export function receiveTileSheets(src, json) {
  return {
    type: RECEIVE_TILE_SHEETS,
    src: src,
    tileSheets: json,
    receivedAt: Date.now()
  };
}

export const RECEIVE_TILE_SHEETS_ERROR = 'RECEIVE_TILE_SHEETS_ERROR';

export function receiveTileSheetsError(src, json) {
  return {
    type: RECEIVE_TILE_SHEETS_ERROR,
    src: src,
    error: json,
    receivedAt: Date.now()
  };
}


// TILE SHEET

export const SELECT_TILE_SHEET = 'SELECT_TILE_SHEET';

export function selectTileSheet(src) {
  return {
    type: SELECT_TILE_SHEET,
    src: src
  };
}

export const REQUEST_TILE_SHEET = 'REQUEST_TILE_SHEET';

export function requestTileSheet(src) {
  return {
    type: REQUEST_TILE_SHEET,
    src: src
  };
}

export const RECEIVE_TILE_SHEET = 'RECEIVE_TILE_SHEET';

export function receiveTileSheet(src, json) {
  return {
    type: RECEIVE_TILE_SHEET,
    src: src,
    tileSheet: json,
    receivedAt: Date.now()
  };
}

export const RECEIVE_TILE_SHEET_ERROR = 'RECEIVE_TILE_SHEET_ERROR';

export function receiveTileSheetError(src, json) {
  return {
    type: RECEIVE_TILE_SHEET_ERROR,
    src: src,
    error: json,
    receivedAt: Date.now()
  };
}


// FETCH

export function fetchTileSheets(src) {
  return dispatch => {
    dispatch(requestTileSheets(src));
    return fetch(src)
      .then(
        response => response.json(),
        response => response.text()
      )
      .then(
        json => dispatch(receiveTileSheets(src, json)),
        json => dispatch(receiveTileSheetsError(src, json))
      );
  };
}

export function fetchTileSheet(src) {
  return dispatch => {
    dispatch(requestTileSheet(src));
    return fetch('/data/' + src + '.json')
      .then(
        response => response.json(),
        response => response.text()
      )
      .then(
        json => dispatch(receiveTileSheet(src, json)),
        json => dispatch(receiveTileSheetError(src, json))
      );
  };
}
