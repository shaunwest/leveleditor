/**
 * Created by shaunwest on 8/23/15.
 */

import { loadLayer } from '../reducers/active-layer-actions.js';
//import { fillTiles, updateTile, updateTiles } from '../reducers/layers-actions.js';
import { fillTiles, updateTile, updateTiles } from '../reducers/tiled-layouts-actions.js';
import { getTilePosition, pixel2Tile, getTileRegion,
  setTileRegion, tileRegionIsEmpty, pixelRect2TileRect,
  fillAllTiles, fillContiguousEmptyTiles, fillContiguousTargetTiles } from '../lib/tile-tools.js';
import { rect, rectContainsPoint } from  '../lib/geom.js';

export function getLayer(layerId) {
  return (dispatch, getState) => {
    const layer = getState().get('layers').get(layerId);
    return dispatch(loadLayer(layer));
  };
}

/* no longer used
function getActiveLayer(layers) {
  return layers
    .get(layers.get('activeLayerId'));
}
*/

export function fillTilesWith(tileId, emptyOnly = false) {
  return (dispatch, getState) => {
    const state = getState();
    const layerId = state.get('filters').get('activeLayerId');
    const layoutId = state.get('layers').get(layerId).get('layoutId');
    const newTiles = state.get('tiledLayouts').get(layoutId).toArray();

    fillAllTiles(newTiles, tileId, emptyOnly);

    return dispatch(fillTiles(layoutId, newTiles));
  };
}

export function addTile(position, tileId, selection) {
  return (dispatch, getState) => {
    const state = getState();
    const layerId = state.get('filters').get('activeLayerId');
    const layer = state.get('layers').get(layerId);
    const layoutId = layer.get('layoutId');
    const layerWidth = layer.get('width');

    if (!selection || rectContainsPoint(position, selection)) {
      return dispatch(updateTile(layoutId, getTilePosition(position.x, position.y, layerWidth), tileId));
    }
  };
}

export function copyTileSelection(fromSelection) {
  return (dispatch, getState) => {
    const state = getState();
    const layerId = state.get('filters').get('activeLayerId');
    const layer = state.get('layers').get(layerId);
    const layoutId = layer.get('layoutId');
    const layerTiles = state.get('tiledLayouts').get(layoutId).toArray();
    const layerWidth = layer.get('width');
    const fromSelectionInTiles = pixelRect2TileRect(fromSelection);

    return getTileRegion(fromSelectionInTiles, layerTiles, pixel2Tile(layerWidth));
  };
}

export function pasteTileSelection(tiles, toSelection) {
  return (dispatch, getState) => {
    const state = getState();
    const layerId = state.get('filters').get('activeLayerId');
    const layer = state.get('layers').get(layerId);
    const layoutId = layer.get('layoutId');
    const layerTiles = state.get('tiledLayouts').get(layoutId).toArray();
    const layerWidth = layer.get('width');
    const toSelectionInTiles = pixelRect2TileRect(toSelection);

    setTileRegion(tiles, toSelectionInTiles, layerTiles, pixel2Tile(layerWidth));
    return dispatch(updateTiles(layerId, layerTiles));
  };
}

export function moveTileSelection(fromPosition, toSelection) {
  return (dispatch, getState) => {
    const state = getState();
    const layerId = state.get('filters').get('activeLayerId');
    const layer = state.get('layers').get(layerId);
    const layoutId = layer.get('layoutId');
    const layerTiles = state.get('tiledLayouts').get(layoutId).toArray();
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
    const layoutId = layer.get('layoutId');
    const layerTiles = state.get('tiledLayouts').get(layoutId).toArray();
    const range = (selection) ?
      pixelRect2TileRect(selection) : 
      pixelRect2TileRect(rect(0, 0, layer.get('width'), layer.get('height')));
    const tileX = pixel2Tile(position.x);
    const tileY = pixel2Tile(position.y);
    const widthInTiles = pixel2Tile(layer.get('width'));

    if (fillTarget) {
      fillContiguousTargetTiles(layerTiles, tileX, tileY, tileId, range, widthInTiles);
    }
    else {
      fillContiguousEmptyTiles(layerTiles, tileX, tileY, tileId, range, widthInTiles);
    }

    return dispatch(updateTiles(layerId, layerTiles));
  };
}

// TODO: can probably be merged into fillTilesWith
export function fillTileSelection(selection, tileId, emptyOnly = false) {
  return (dispatch, getState) => {
    const state = getState();
    const layerId = state.get('filters').get('activeLayerId');
    const layer = state.get('layers').get(layerId);
    const layoutId = layer.get('layoutId');
    const layerTiles = state.get('tiledLayouts').get(layoutId).toArray();
    const layerWidth = layer.get('width');

    if (selection) {
      for (let x = selection.x; x < selection.x + selection.width; x++) {
        for (let y = selection.y; y < selection.y + selection.height; y++) {
          const layerTilePosition = getTilePosition(x, y, layerWidth);
          if (!emptyOnly || typeof layerTiles[layerTilePosition] === 'undefined') {
            layerTiles[layerTilePosition] = tileId;
          }
        }
      }
    }

    return dispatch(updateTiles(layerId, layerTiles));
  };
}
