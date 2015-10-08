/**
 * Created by shaunwest on 8/23/15.
 */

// TILES
export const ADD_TILE = 'ADD_TILE';

export function addTile(index, id) {
  return {
    type: ADD_TILE,
    index,
    id
  };
}

export const REMOVE_TILE = 'REMOVE_TILE';

export function removeTile(index) {
  return {
    type: REMOVE_TILE,
    index
  };
}
