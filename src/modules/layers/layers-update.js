/**
 * Created by shaunwest on 8/23/15.
 */

import { fillTiles, updateTile, updateTiles } from './layers-actions.js';
import { getTilePosition, pixel2Tile, getTileRegion,
  setTileRegion, tileRegionIsEmpty, pixelRect2TileRect,
  fillAllTiles, fillContiguousEmptyTiles, fillContiguousTargetTiles } from '../../lib/tile-tools.js';
import { rect, rectContainsPoint } from  '../../lib/geom.js';

function getActiveLayer(layers) {
  return layers
    .get('items')
    .get(layers.get('activeLayerId'));
}

export function fillTilesWith(tileId, emptyOnly = false) {
  return (dispatch, getState) => {
    const activeLayer = getActiveLayer(getState().get('layers'));
    const newTiles = activeLayer.get('sprites').toArray();
    const layerId = activeLayer.get('id');

    fillAllTiles(newTiles, tileId, emptyOnly);

    return dispatch(fillTiles(layerId, newTiles));
  };
}

export function addTile(position, tileId, selection) {
  return (dispatch, getState) => {
    const activeLayer = getActiveLayer(getState().get('layers'));
    const layerWidth = activeLayer.get('width');
    const layerId = activeLayer.get('id');

    if (!selection || rectContainsPoint(position, selection)) {
      return dispatch(updateTile(layerId, getTilePosition(position.x, position.y, layerWidth), tileId));
    }
  }
}

export function copyTileSelection(fromSelection) {
  return (dispatch, getState) => {
    const activeLayer = getActiveLayer(getState().get('layers'));
    const layerTiles = activeLayer.get('sprites').toArray();
    const layerWidth = activeLayer.get('width');
    const fromSelectionInTiles = pixelRect2TileRect(fromSelection);

    return getTileRegion(fromSelectionInTiles, layerTiles, pixel2Tile(layerWidth));
  };
}

export function pasteTileSelection(tiles, toSelection) {
  return (dispatch, getState) => {
    const activeLayer = getActiveLayer(getState().get('layers'));
    const layerTiles = activeLayer.get('sprites').toArray();
    const layerWidth = activeLayer.get('width');
    const layerId = activeLayer.get('id');
    const toSelectionInTiles = pixelRect2TileRect(toSelection);

    setTileRegion(tiles, toSelectionInTiles, layerTiles, pixel2Tile(layerWidth));
    return dispatch(updateTiles(layerId, layerTiles));
  };
}

export function moveTileSelection(fromPosition, toSelection) {
  return (dispatch, getState) => {
    const activeLayer = getActiveLayer(getState().get('layers'));
    const layerTiles = activeLayer.get('sprites').toArray();
    const layerWidth = activeLayer.get('width');
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
    const activeLayer = getActiveLayer(getState().get('layers'));
    const layerTiles = activeLayer.get('sprites').toArray();
    const layerId = activeLayer.get('id');
    const range = (selection) ?
      pixelRect2TileRect(selection) : 
      pixelRect2TileRect(rect(0, 0, activeLayer.get('width'), activeLayer.get('height')));
    const tileX = pixel2Tile(position.x);
    const tileY = pixel2Tile(position.y);
    const widthInTiles = pixel2Tile(activeLayer.get('width'));

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
    const activeLayer = getActiveLayer(getState().get('layers'));
    const layerTiles = activeLayer.get('sprites').toArray();
    const layerWidth = activeLayer.get('width');
    const layerId = activeLayer.get('id');

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
  }
}
