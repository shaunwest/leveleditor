/**
 * Created by shaunwest on 1/10/16.
 */

export const INIT_TILED_LAYOUTS = 'INIT_TILED_LAYOUTS';

export function initTiledLayouts(layouts) {
  return { 
    type: INIT_TILED_LAYOUTS,
    layouts
  };
}

export const UPDATE_TILES = 'UPDATE_TILES';
export function updateTiles(layoutId, layout) {
  return {
    type: UPDATE_TILES,
    layoutId,
    layout
  };
}

export const ADD_TILE = 'ADD_TILE';

// TODO: change index to tileIndex
export function addTile(layoutId, index, id, selection) {
  return {
    type: ADD_TILE,
    layoutId,
    index,
    id,
    selection
  };
}

export const REMOVE_TILE = 'REMOVE_TILE';

export function removeTile(layoutId, index, selection) {
  return {
    type: REMOVE_TILE,
    layoutId,
    index,  
    selection
  };
}

export const FILL_TILES = 'FILL_TILES';

export function fillTiles(layoutId, layout, selection) {
  return {
    type: FILL_TILES,
    layoutId,
    layout,
    selection
  };
}

export const UPDATE_TILE = 'UPDATE_TILE';
export function updateTile(layoutId, index, tileId) {
  return {
    type: UPDATE_TILE,
    layoutId,
    index,
    tileId
  };
}
