/**
 * Created by shaunwest on 9/13/15.
 */

import { Range } from 'immutable';

const TILE_SIZE = 16;

export function processTiles(image, tiles) {
  return tiles.map(function (tile) {
    return processTile(
      image,
      tile.get('x'),
      tile.get('y'),
      tile.get('width'),
      tile.get('height'),
      tile.get('xRange')
    );
  });
}

export function processTile(image, x = 0, y = 0, width = TILE_SIZE, height = TILE_SIZE, xRange = 1) {
  const rangeEnd = x + (width * xRange);
  return Range(x, rangeEnd, width)
    .map(x => makeTileImage(image, x, y, width, height));
}

function makeTileImage(image, x, y, width, height) {
  const tile = document.createElement('canvas');
  tile.width  = width;
  tile.height = height;

  const tileContext = tile.getContext('2d');
  tileContext.drawImage(
    image,
    x, y,
    width, height,
    0, 0,
    width, height
  );

  return tile;
}
