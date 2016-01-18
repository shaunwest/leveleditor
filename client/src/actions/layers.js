/**
 * Created by shaunwest on 1/16/16.
 */

import { getTilePosition, pixel2Tile, getTileRegion,
  setTileRegion, tileRegionIsEmpty, pixelRect2TileRect,
  fillAllTiles, fillContiguousEmptyTiles, fillContiguousTargetTiles } from '../lib/tile-tools.js';
import { rect, rectContainsPoint } from  '../lib/geom.js';

export const UPDATE_TILES = 'UPDATE_TILES';
export function updateTiles(layerId, tiles) {
  return {
    type: UPDATE_TILES,
    layerId,
    tiles
  };
}

export const ADD_TILE = 'ADD_TILE';
export function addTile(layerId, tileIndex, tileId, selection) {
  return {
    type: ADD_TILE,
    layerId,
    tileIndex,
    tileId,
    selection
  };
}

export const REMOVE_TILE = 'REMOVE_TILE';
export function removeTile(layerId, tileIndex, selection) {
  return {
    type: REMOVE_TILE,
    layerId,
    tileIndex,  
    selection
  };
}

export const FILL_TILES = 'FILL_TILES';
export function fillTiles(layerId, layout, selection) {
  return {
    type: FILL_TILES,
    layerId,
    layout,
    selection
  };
}

export const UPDATE_TILE = 'UPDATE_TILE';
export function updateTile(layerId, tileIndex, tileId) {
  return {
    type: UPDATE_TILE,
    layerId,
    tileIndex,
    tileId
  };
}

export function fillTilesWith(tileId, emptyOnly = false) {
  return (dispatch, getState) => {
    const state = getState();
    const layerId = state.get('filters').get('activeLayerId');
    const newTiles = state.get('layers').get(layerId).get('layout').toArray();

    fillAllTiles(newTiles, tileId, emptyOnly);

    return dispatch(fillTiles(layerId, newTiles));
  };
}

export function addTile(position, tileId, selection) {
  return (dispatch, getState) => {
    const state = getState();
    const layerId = state.get('filters').get('activeLayerId');
    const layer = state.get('layers').get(layerId);
    const layerWidth = layer.get('width');

    if (!selection || rectContainsPoint(position, selection)) {
      return dispatch(updateTile(layerId, getTilePosition(position.x, position.y, layerWidth), tileId));
    }
  };
}

export function copyTileSelection(fromSelection) {
  return (dispatch, getState) => {
    const state = getState();
    const layerId = state.get('filters').get('activeLayerId');
    const layer = state.get('layers').get(layerId);
    const layout = layer.get('layout').toArray();
    const layerWidth = layer.get('width');
    const fromSelectionInTiles = pixelRect2TileRect(fromSelection);

    return getTileRegion(fromSelectionInTiles, layout, pixel2Tile(layerWidth));
  };
}

export function pasteTileSelection(tiles, toSelection) {
  return (dispatch, getState) => {
    const state = getState();
    const layerId = state.get('filters').get('activeLayerId');
    const layer = state.get('layers').get(layerId);
    const layout = layer.get('layout').toArray();
    const layerWidth = layer.get('width');
    const toSelectionInTiles = pixelRect2TileRect(toSelection);

    setTileRegion(tiles, toSelectionInTiles, layout, pixel2Tile(layerWidth));
    return dispatch(updateTiles(layerId, layout));
  };
}

export function moveTileSelection(fromPosition, toSelection) {
  return (dispatch, getState) => {
    const state = getState();
    const layerId = state.get('filters').get('activeLayerId');
    const layer = state.get('layers').get(layerId);
    const layerWidth = layer.get('width');
    const fromSelection = rect(
      fromPosition.x,
      fromPosition.y,
      toSelection.width,
      toSelection.height
    );

    const tileRegion = dispatch(copyTileSelection(fromSelection));
    if (!tileRegionIsEmpty(tileRegion)) {
      dispatch(fillTileSelection(fromSelection));
      dispatch(pasteTileSelection(tileRegion, toSelection));
    }
  };
}

// TODO: probably could do some more refactoring
export function fillContiguousTiles(position, tileId, fillTarget = false, selection = undefined) {
  return (dispatch, getState) => {
    const state = getState();
    const layerId = state.get('filters').get('activeLayerId');
    const layer = state.get('layers').get(layerId);
    const layout = layer.get('layout').toArray();
    const range = (selection) ?
      pixelRect2TileRect(selection) : 
      pixelRect2TileRect(rect(0, 0, layer.get('width'), layer.get('height')));
    const tileX = pixel2Tile(position.x);
    const tileY = pixel2Tile(position.y);
    const widthInTiles = pixel2Tile(layer.get('width'));

    if (fillTarget) {
      fillContiguousTargetTiles(layout, tileX, tileY, tileId, range, widthInTiles);
    }
    else {
      fillContiguousEmptyTiles(layout, tileX, tileY, tileId, range, widthInTiles);
    }

    return dispatch(updateTiles(layerId, layout));
  };
}

// TODO: can probably be merged into fillTilesWith
export function fillTileSelection(selection, tileId, emptyOnly = false) {
  return (dispatch, getState) => {
    const state = getState();
    const layerId = state.get('filters').get('activeLayerId');
    const layer = state.get('layers').get(layerId);
    const layout = layer.get('layout').toArray();
    const layerWidth = layer.get('width');

    if (selection) {
      for (let x = selection.x; x < selection.x + selection.width; x++) {
        for (let y = selection.y; y < selection.y + selection.height; y++) {
          const layerTilePosition = getTilePosition(x, y, layerWidth);
          if (!emptyOnly || typeof layout[layerTilePosition] === 'undefined') {
            layout[layerTilePosition] = tileId;
          }
        }
      }
    }

    return dispatch(updateTiles(layerId, layout));
  };
}
