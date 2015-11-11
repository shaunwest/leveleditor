/**
 * Created by shaunwest on 8/23/15.
 */

import { fillTiles } from './layers-actions.js';

export function fillTilesWith(tileId) {
  return (dispatch, getState) => {
    const layers = getState().get('layers');
    const activeIndex = layers.get('activeLayerIndex');
    const newTiles = [];
    const tiles = layers
        .get('items')
        .get(activeIndex)
        .get('tiles');

    for (let i = 0; i < tiles.size; i++) {
      newTiles[i] = tileId;
    }

    return dispatch(fillTiles(newTiles));
  };
}
