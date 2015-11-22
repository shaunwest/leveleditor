/**
 * Created by shaunwest on 8/23/15.
 */

import { fillTiles, updateTiles } from './layers-actions.js';

function getActiveTiles(layers) {
  return layers
    .get('items')
    .get(layers.get('activeLayerIndex'))
    .get('tiles');
}

function getTilePosition(pixelX, pixelY, width) {
  const widthInTiles = Math.floor(width / 16),
    tileY = Math.floor(pixelY / 16),
    tileX = Math.floor(pixelX / 16);

  return (tileY * widthInTiles) + tileX;
}

export function fillTilesWith(tileId) {
  return (dispatch, getState) => {
    const currentTiles = getActiveTiles(getState().get('layers'));
    const newTiles = [];

    for (let i = 0; i < currentTiles.size; i++) {
      newTiles[i] = tileId;
    }

    return dispatch(fillTiles(newTiles));
  };
}

export function fillTileSelection(position, tileIndex, selection) {
  return (dispatch, getState) => {
    const layers = getState().get('layers');
    const activeIndex = layers.get('activeLayerIndex');
    const activeLayer = layers.get('items').get(activeIndex);
    const layerTiles = activeLayer.get('tiles').toArray();
    const layerWidth = activeLayer.get('width');

    if (selection) {
      for (let x = selection.x; x < selection.x + selection.width; x++) {
        for (let y = selection.y; y < selection.y + selection.height; y++) {
          const layerTilePosition = getTilePosition(x, y, layerWidth);
          layerTiles[layerTilePosition] = tileIndex;
        }
      }
    }

    return dispatch(updateTiles(layerTiles));
  }
}
