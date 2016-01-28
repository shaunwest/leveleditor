/**
 * Created by shaunwest on 1/16/16.
 */

import { getTilePosition, pixel2Tile, pixel2TilePoint, getTileRegion,
  setTileRegion, tileRegionIsEmpty, pixelRect2TileRect,
  fillAllTiles, fillContiguousEmptyTiles, fillContiguousTargetTiles } from '../lib/util/tile-tools.js';
import { rect, line, rectContainsPoint, flattenCoord } from  '../lib/util/geom.js';

export const UPDATE_TILES = 'UPDATE_TILES';
export function updateTiles(layerId, tiles) {
  return {
    type: UPDATE_TILES,
    layerId,
    tiles
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

export function fillTileSelection(tileId, selection, emptyOnly = false) {
  return (dispatch, getState) => {
    const state = getState();
    const layerId = state.get('filters').get('activeLayerId');
    const layer = state.get('layers').get(layerId);
    const layout = layer.get('layout').toArray();
    const layerWidth = layer.get('width');
    const layerHeight = layer.get('height');

    if (!selection) {
      selection = rect(0, 0, layerWidth, layerHeight);
    }

    for (let x = selection.x; x < selection.x + selection.width; x++) {
      for (let y = selection.y; y < selection.y + selection.height; y++) {
        const layerTilePosition = getTilePosition(x, y, layerWidth);
        if (!emptyOnly || typeof layout[layerTilePosition] === 'undefined') {
          layout[layerTilePosition] = tileId;
        }
      }
    }

    return dispatch(updateTiles(layerId, layout));
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

// Seems like it's working -- probably needs some more testing
// TODO:
// I think some perf considerations need to be taken with this concept of
// updating the entire layout array and merging it back into the data store
// maybe only update relevant chunks?
// AND/OR throttle updates to the data store
export function addTiles(startPosition, destPosition, tileId, selection) {
  return (dispatch, getState) => {
    const state = getState();
    const layerId = state.get('filters').get('activeLayerId');
    const layer = state.get('layers').get(layerId);
    const layout = layer.get('layout').toArray();
    const layerWidth = pixel2Tile(layer.get('width'));
    const positions = line(pixel2TilePoint(startPosition), pixel2TilePoint(destPosition));
    console.log('POSITIONS', positions);

    //if (!selection || rectContainsPoint(position, selection)) {
    positions.forEach((position) => {
      const layoutPosition = flattenCoord(position.x, position.y, layerWidth);
      layout[layoutPosition] = tileId;
    });

    return dispatch(updateTiles(layerId, layout));
    //}
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
      dispatch(fillTileSelection(undefined, fromSelection));
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
