/**
 * Created by shaunwest on 12/13/15.
 */

import { flattenCoord } from './geom.js';

function pixel2Cell(pixel, cellSize) {
  return Math.floor(pixel / cellSize);
}

export function create(width, height) {
  const grid = [];
  const size = width * height;

  for (let i = 0; i < size; i++) {
    grid[i] = undefined;
  }

  return grid;
}

export function populate(grid, items = [], cellSize = 128, gridWidth) {
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
