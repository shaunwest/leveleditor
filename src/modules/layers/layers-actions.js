export const ADD_TILE = 'ADD_TILE';

// TODO: change index to tileIndex
export function addTile(layerId, index, id, selection) {
  return {
    type: ADD_TILE,
    layerId,
    index,
    id,
    selection
  };
}

export const REMOVE_TILE = 'REMOVE_TILE';

export function removeTile(layerId, index, selection) {
  return {
    type: REMOVE_TILE,
    layerId,
    index,  
    selection
  };
}

export const FILL_TILES = 'FILL_TILES';

export function fillTiles(layerId, tiles, selection) {
  return {
    type: FILL_TILES,
    layerId,
    tiles,
    selection
  };
}

export const UPDATE_TILES = 'UPDATE_TILES';
export function updateTiles(layerId, tiles) {
  return {
    type: UPDATE_TILES,
    layerId,
    tiles
  };
}

export const UPDATE_TILE = 'UPDATE_TILE';
export function updateTile(layerId, index, tileId) {
  return {
    type: UPDATE_TILE,
    layerId,
    index,
    tileId
  };
}

// TODO: should this be here or somewhere new?
export const SELECT_LAYER = 'SELECT_LAYER';
export function selectLayer(layerId) {
  return {
    type: SELECT_LAYER,
    layerId
  };
}

// TODO: should this be here or somewhere new?
export const TOGGLE_LAYER = 'TOGGLE_LAYER';
export function toggleLayer(layerId, visible) {
  return {
    type: TOGGLE_LAYER,
    layerId,
    visible
  };
}


