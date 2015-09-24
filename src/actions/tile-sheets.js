/**
 * Created by shaunwest on 9/7/15.
 */

import 'isomorphic-fetch';
import getImage from '../image-loader.js';
import { processTiles } from '../tilesheet-processor.js';

// Probably should make these immutable Maps...

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

export function selectTileSheet(id) {
  return {
    type: SELECT_TILE_SHEET,
    id: id
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

export function receiveTileSheetError(src, error) {
  return {
    type: RECEIVE_TILE_SHEET_ERROR,
    src: src,
    error: error,
    receivedAt: Date.now()
  };
}

export const REQUEST_TILE_SHEET_IMAGE = 'REQUEST_TILE_SHEET_IMAGE';

export function requestTileSheetImage(src, imageSrc) {
  return {
    type: REQUEST_TILE_SHEET_IMAGE,
    src: src,
    imageSrc: imageSrc
  }
}

export const RECEIVE_TILE_SHEET_IMAGE = 'RECEIVE_TILE_SHEET_IMAGE';

export function receiveTileSheetImage(src, imageSrc, image) {
  return {
    type: RECEIVE_TILE_SHEET_IMAGE,
    src: src,
    imageSrc: imageSrc,
    image: image,
    receivedAt: Date.now()
  }
}

export const RECEIVE_TILE_SHEET_IMAGE_ERROR = 'RECEIVE_TILE_SHEET_IMAGE_ERROR';

export function receiveTileSheetImageError(src) {
  return {
    type: RECEIVE_TILE_SHEET_IMAGE_ERROR,
    src: src
  }
}

export const MADE_TILES = 'MADE_TILES';

export function madeTiles(src, tileImages) {
  return {
    type: MADE_TILES,
    src: src,
    tileImages: tileImages
  };
}

// TILE

export const SELECT_TILE = 'SELECT_TILE';

export function selectTile(tileIndex) {
  return {
    type: SELECT_TILE,
    tileIndex: tileIndex
  };
}



// FETCH

export function fetchTileSheets(src) {
  return dispatch => {
    dispatch(requestTileSheets(src));
    return fetch(src)
      .then(
        response => response.json(),
        response => response.json()
      )
      .then(
        json => dispatch(receiveTileSheets(src, json)),
        json => {
          dispatch(receiveTileSheetsError(src, json));
          return Promise.reject(json);
        }
      );
  };
}

export function fetchTileSheet(src) {
  return dispatch => {
    dispatch(requestTileSheet(src));
    return fetch('/data/' + src + '.json')
      .then(
        response => response.json(),
        response => response.json()
      )
      //.catch(function(error) { return Promise.reject(error); })
      .then(
        json => dispatch(receiveTileSheet(src, json)),
        json => {
          dispatch(receiveTileSheetError(src, json));
          return Promise.reject(json);
        }
      )
  };
}

export function fetchTileSheetImage(src, imageSrc) {
  return dispatch => {
    dispatch(requestTileSheetImage(src, imageSrc));
    return getImage('/data/assets/' + imageSrc)
      .then(
        image => dispatch(receiveTileSheetImage(src, imageSrc, image)),
        error => {
          dispatch(receiveTileSheetImageError(imageSrc));
          return Promise.reject(error);
        }
      );
  };
}

export function fetchAll(src) {
  return (dispatch, getState) => {
    return dispatch(fetchTileSheets(src))
      .then(
        action => {
          getState().tileSheets.get('items').toSeq()
            .forEach((tileSheet, src) => {
              dispatch(getTileSheet(src));
            });
        },
        error => {
          return error;
        }
      );
  };
}

function getTileSheet(src) {
  return (dispatch, getState) => {
    dispatch(fetchTileSheet(src))
      .then(
        action => {
          const imageSrc = getState().tileSheets.getIn(['items', src, 'src']);
          return dispatch(getTileSheetImage(src, imageSrc));
        },
        error => {
          console.log('Error fetching tile sheet', error);
        }
      );
  };
}

function getTileSheetImage(src, imageSrc) {
  return (dispatch, getState) => {
    dispatch(fetchTileSheetImage(src, imageSrc))
      .then(
        action => {
          const image = getState().tileSheets.getIn(['items', src, 'image']);
          const tiles = getState().tileSheets.getIn(['items', src, 'tiles']);
          const tileImages = processTiles(image, tiles);
          return dispatch(madeTiles(src, tileImages));
        },
        error => {
          console.log('Error fetching tile sheet image', error);
        }
      );
  };
}
