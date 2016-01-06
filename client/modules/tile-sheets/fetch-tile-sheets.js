/**
 * Created by shaunwest on 9/7/15.
 */

import 'isomorphic-fetch';
import { DATA_PATH } from '../../paths.js';
import getImage from '../../lib/image-loader.js';
import { processSprites } from '../../lib/sprite-sheet-processor.js';

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

export function receiveTileSheets(src, tileSheets) {
  return {
    type: RECEIVE_TILE_SHEETS,
    src,
    tileSheets,
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


// GET TILE SHEET

export const REQUEST_TILE_SHEET = 'REQUEST_TILE_SHEET';

export function requestTileSheet(src) {
  return {
    type: REQUEST_TILE_SHEET,
    src
  };
}

export const RECEIVE_TILE_SHEET = 'RECEIVE_TILE_SHEET';

export function receiveTileSheet(src, json) {
  return {
    type: RECEIVE_TILE_SHEET,
    src,
    tileSheet: json,
    receivedAt: Date.now()
  };
}

export const RECEIVE_TILE_SHEET_ERROR = 'RECEIVE_TILE_SHEET_ERROR';

export function receiveTileSheetError(src, error) {
  return {
    type: RECEIVE_TILE_SHEET_ERROR,
    src,
    error,
    receivedAt: Date.now()
  };
}

export const REQUEST_TILE_SHEET_IMAGE = 'REQUEST_TILE_SHEET_IMAGE';

export function requestTileSheetImage(src, imageSrc) {
  return {
    type: REQUEST_TILE_SHEET_IMAGE,
    src,
    imageSrc
  };
}

export const RECEIVE_TILE_SHEET_IMAGE = 'RECEIVE_TILE_SHEET_IMAGE';

export function receiveTileSheetImage(src, imageSrc, image) {
  return {
    type: RECEIVE_TILE_SHEET_IMAGE,
    src,
    imageSrc,
    image,
    receivedAt: Date.now()
  };
}

export const RECEIVE_TILE_SHEET_IMAGE_ERROR = 'RECEIVE_TILE_SHEET_IMAGE_ERROR';

export function receiveTileSheetImageError(src) {
  return {
    type: RECEIVE_TILE_SHEET_IMAGE_ERROR,
    src
  };
}

export const MADE_TILES = 'MADE_TILES';

export function madeTiles(src, tileImages) {
  return {
    type: MADE_TILES,
    src,
    tileImages
  };
}


// SELECTED
export const SELECTED_TILE_SHEET = 'SELECTED_TILE_SHEET';

//export function selectedTileSheet(id) {
export function selectedTileSheet(tileSheet) {
  return {
    type: SELECTED_TILE_SHEET,
    tileSheet
  };
}

export const SELECT_TILE = 'SELECT_TILE';

export function selectTile(tileIndex) {
  return {
    type: SELECT_TILE,
    tileIndex
  };
}

// SELECT
export function selectTileSheet(id) {
  return (dispatch, getState) => {
    const tileSheet = getState().get('tileSheets').get('items').get(id),
      tileImages = processSprites(tileSheet.get('image'), tileSheet.get('tiles'));

    //dispatch(selectedTileSheet(id));   
    dispatch(selectedTileSheet(tileSheet));
    dispatch(madeTiles(id, tileImages));
  };
}

// FETCH

export function fetchAll(src) {
  return (dispatch, getState) => {
    return dispatch(fetchTileSheets(src))
      .then(
        action => {
          getState().get('tileSheets').get('items').toSeq()
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

export function fetchTileSheets(src) {
  return dispatch => {
    dispatch(requestTileSheets(src));
    return fetch(src)
      .then(
        response => response.json(),
        response => response.json()
      )
      .then(
        tileSheets => {
          /*const defaultId = Object.keys(tileSheets)
            .reduce((defaultId, tileSheetId) => {
              return (tileSheets[tileSheetId].default) ? 
                tileSheetId : 
                defaultId;
            });*/

          dispatch(receiveTileSheets(src, tileSheets));
        },
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
    return fetch(DATA_PATH + src + '.json')
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
      );
  };
}

export function fetchTileSheetImage(src, imageSrc) {
  return dispatch => {
    dispatch(requestTileSheetImage(src, imageSrc));
    return getImage(DATA_PATH + 'assets/' + imageSrc)
      .then(
        image => dispatch(receiveTileSheetImage(src, imageSrc, image)),
        error => {
          dispatch(receiveTileSheetImageError(imageSrc));
          return Promise.reject(error);
        }
      );
  };
}

function getTileSheet(src) {
  return (dispatch, getState) => {
    dispatch(fetchTileSheet(src))
      .then(
        action => {
          const imageSrc = getState().get('tileSheets').getIn(['items', src, 'src']);
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
          const tileSheets = getState().get('tileSheets'),
            tileSheet = tileSheets.getIn(['items', src]);
            //tileImages = processTiles(tileSheet.get('image'), tileSheet.get('tiles'));
          
          //dispatch(madeTiles(src, tileImages));

          if (tileSheet.get('default')) {
            dispatch(selectTileSheet(src));
          }
        },
        error => {
          console.log('Error fetching tile sheet image', error);
        }
      );
  };
}
