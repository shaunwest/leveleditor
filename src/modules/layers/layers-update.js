/**
 * Created by shaunwest on 8/23/15.
 */

import { fillTiles, updateTile, updateTiles } from './layers-actions.js';
import { point, rect } from  '../../lib/geom.js';

function getActiveLayer(layers) {
  return layers
    .get('items')
    .get(layers.get('activeLayerIndex'));
}

function getTilePosition(pixelX, pixelY, width) {
  const widthInTiles = Math.floor(width / 16),
    tileY = Math.floor(pixelY / 16),
    tileX = Math.floor(pixelX / 16);

  return (tileY * widthInTiles) + tileX;
}

function flattenCoord(x, y, targetWidth) {
  return (y * targetWidth) + x;
}

function unFlattenCoord(value, targetWidth) {
  return {
    x: value % targetWidth,
    y: Math.floor(value / targetWidth)
  };
}

function rectContainsPoint(point, rect) {
  return (point.x >= rect.x && point.x < rect.x + rect.width && 
    point.y >= rect.y && point.y < rect.y + rect.height);
}

function pixel2Tile(pixel) {
  return Math.floor(pixel / 16);
}

function pixel2TilePoint(pixel) {
  return point(pixel2Tile(pixel.x), pixel2Tile(pixel.y));
}

function getTileRegion(rect, parentTiles, parentWidth) {
  const tiles = [];
  const max = point(rect.x + rect.width, rect.y + rect.height);

  for (let x = rect.x; x < max.x; x++) {
    for (let y = rect.y; y < max.y; y++) {
      const tilePosition = flattenCoord(x, y, parentWidth);
      tiles.push(parentTiles[tilePosition]);
    }
  }

  return tiles;
}

function setTileRegion(regionTiles, destRect, parentTiles, parentWidth) {
  const max = point(destRect.x + destRect.width, destRect.y + destRect.height);
  let destIndex = 0;

  for (let x = destRect.x; x < max.x; x++) {
    for (let y = destRect.y; y < max.y; y++) {
      const tilePosition = flattenCoord(x, y, parentWidth);
      parentTiles[tilePosition] = regionTiles[destIndex++];
    }
  }
}

function tileRegionIsEmpty(tiles) {
  return tiles && !tiles.filter(tile => tile !== undefined).length;
}

function pixelRect2TileRect(pixelRect) {
  return rect(
    pixel2Tile(pixelRect.x),
    pixel2Tile(pixelRect.y),
    pixel2Tile(pixelRect.width),
    pixel2Tile(pixelRect.height)
  );
}

export function fillTilesWith(tileId) {
  return (dispatch, getState) => {
    const currentTiles = getActiveLayer(getState().get('layers')).get('tiles');
    const newTiles = [];

    for (let i = 0; i < currentTiles.size; i++) {
      newTiles[i] = tileId;
    }

    return dispatch(fillTiles(newTiles));
  };
}

export function addTile(position, tileId, selection) {
  return (dispatch, getState) => {
    const layerWidth = getActiveLayer(getState().get('layers')).get('width');

    if (!selection) {
      return dispatch(updateTile(getTilePosition(position.x, position.y, layerWidth), tileId));
    }

    if (rectContainsPoint(position, selection)) {
      return dispatch(updateTile(getTilePosition(position.x, position.y, layerWidth), tileId));
    } 
  }
}

export function copyTileSelection(fromSelection) {
  return (dispatch, getState) => {
    const activeLayer = getActiveLayer(getState().get('layers'));
    const layerTiles = activeLayer.get('tiles').toArray();
    const layerWidth = activeLayer.get('width');
    const fromSelectionInTiles = pixelRect2TileRect(fromSelection);

    return getTileRegion(fromSelectionInTiles, layerTiles, pixel2Tile(layerWidth));
  };
}

export function pasteTileSelection(tiles, toSelection) {
  return (dispatch, getState) => {
    const activeLayer = getActiveLayer(getState().get('layers'));
    const layerTiles = activeLayer.get('tiles').toArray();
    const layerWidth = activeLayer.get('width');
    const toSelectionInTiles = pixelRect2TileRect(toSelection);

    setTileRegion(tiles, toSelectionInTiles, layerTiles, pixel2Tile(layerWidth));
    return dispatch(updateTiles(layerTiles));
  };
}

export function moveTileSelection(fromPosition, toSelection) {
  return (dispatch, getState) => {
    const activeLayer = getActiveLayer(getState().get('layers'));
    const layerTiles = activeLayer.get('tiles').toArray();
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

export function fillTileSelection(selection, tileId) {
  return (dispatch, getState) => {
    const activeLayer = getActiveLayer(getState().get('layers'));
    const layerTiles = activeLayer.get('tiles').toArray();
    const layerWidth = activeLayer.get('width');

    if (selection) {
      for (let x = selection.x; x < selection.x + selection.width; x++) {
        for (let y = selection.y; y < selection.y + selection.height; y++) {
          const layerTilePosition = getTilePosition(x, y, layerWidth);
          layerTiles[layerTilePosition] = tileId;
        }
      }
    }

    return dispatch(updateTiles(layerTiles));
  }
}
