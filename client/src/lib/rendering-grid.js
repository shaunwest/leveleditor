/**
 * Created by shaunwest on 12/13/15.
 */

import { flattenCoord } from './util/geom.js';

const DEFAULT_CELL_SIZE = 128;

function pixel2Cell(pixel, cellSize) {
  return Math.floor(pixel / cellSize);
}

export function create(width, height, cellSize = DEFAULT_CELL_SIZE) {
  const grid = [];
  const size = pixel2Cell(width, cellSize) * pixel2Cell(height, cellSize);

  for (let i = 0; i < size; i++) {
    grid[i] = undefined;
  }

  return grid;
}

export function populate(grid, items = [], cellSize = DEFAULT_CELL_SIZE, gridWidth) {
  const numItems = items.length;

  for (let i = 0; i < numItems; i++) {
    const item = items[i];
    const gridX = pixel2Cell(item.x, cellSize);
    const gridY = pixel2Cell(item.y, cellSize);
    const gridIndex = flattenCoord(gridX, gridY, gridWidth);
    grid[gridIndex] = item.id;
  }

  return grid;
}
