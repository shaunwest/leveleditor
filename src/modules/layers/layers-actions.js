export const ADD_TILE = 'ADD_TILE';

export function addTile(index, id, selection) {
  return {
    type: ADD_TILE,
    index,
    id,
    selection
  };
}

export const REMOVE_TILE = 'REMOVE_TILE';

export function removeTile(index, selection) {
  return {
    type: REMOVE_TILE,
    index,  
    selection
  };
}

export const FILL_TILES = 'FILL_TILES';

export function fillTiles(tiles, selection) {
  return {
    type: FILL_TILES,
    tiles,
    selection
  };
}

export const UPDATE_TILES = 'UPDATE_TILES';
export function updateTiles(tiles) {
  return {
    type: UPDATE_TILES,
    tiles
  };
}

// TODO: should this be here or somewhere new?
export const SELECT_LAYER = 'SELECT_LAYER';
export function selectLayer(index) {
  return {
    type: SELECT_LAYER,
    index
  };
}

// TODO: should this be here or somewhere new?
export const TOGGLE_LAYER = 'TOGGLE_LAYER';
export function toggleLayer(index, visible) {
  return {
    type: TOGGLE_LAYER,
    index,
    visible
  };
}


