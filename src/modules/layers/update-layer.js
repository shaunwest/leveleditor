/**
 * Created by shaunwest on 8/23/15.
 */

// TILES
export const ADD_TILE = 'ADD_TILE';

export function addTile(src, index, id) {
  return {
    src,
    type: ADD_TILE,
    index,
    id
  };
}


