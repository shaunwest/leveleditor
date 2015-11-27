/**
 * Created by shaunwest on 8/23/15.
 */

import { fillTiles, updateTile, updateTiles } from './layers-actions.js';

function getActiveLayer(layers) {
  return layers
    .get('items')
    .get(layers.get('activeLayerIndex'));
    //.get('tiles');
}

function getTilePosition(pixelX, pixelY, width) {
  const widthInTiles = Math.floor(width / 16),
    tileY = Math.floor(pixelY / 16),
    tileX = Math.floor(pixelX / 16);

  return (tileY * widthInTiles) + tileX;
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

function rectContainsPoint(point, rect) {
  return (point.x >= rect.x && point.x < rect.x + rect.width && 
    point.y >= rect.y && point.y < rect.y + rect.height);
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

export function moveTileSelection(tileId, selection, oldPosition) {
  return (dispatch, getState) => {
    dispatch(
      fillTileSelection(
        undefined,
        rect(oldPosition.x, oldPosition.y, selection.width, selection.height)
      )
    );

    return dispatch(
      fillTileSelection(
        tileId,
        selection
      )
    );
  }
}

export function fillTileSelection(tileId, selection) {
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
