/**
 * Created by shaunwest on 8/23/15.
 */

import { point, rect, flattenCoord } from './geom.js';

export function getTilePosition(pixelX, pixelY, width) {
  const widthInTiles = pixel2Tile(width),
    tileY = pixel2Tile(pixelY),
    tileX = pixel2Tile(pixelX);

  return flattenCoord(tileX, tileY, widthInTiles);
}

export function pixel2Tile(pixel) {
  return Math.floor(pixel / 16);
}

export function pixel2TilePoint(pixel) {
  return point(pixel2Tile(pixel.x), pixel2Tile(pixel.y));
}

export function getTileRegion(rect, parentTiles, parentWidth) {
  const tiles = [];
  const max = point(rect.x + rect.width, rect.y + rect.height);

  for (let x = rect.x; x < max.x; x++) {
    for (let y = rect.y; y < max.y; y++) {
      const tilePosition = flattenCoord(x, y, parentWidth);
      tiles.push(parentTiles[tilePosition]);
    }
  }

  return tiles;
}

export function setTileRegion(regionTiles, destRect, parentTiles, parentWidth) {
  const max = point(destRect.x + destRect.width, destRect.y + destRect.height);
  let destIndex = 0;

  for (let x = destRect.x; x < max.x; x++) {
    for (let y = destRect.y; y < max.y; y++) {
      const tilePosition = flattenCoord(x, y, parentWidth);
      parentTiles[tilePosition] = regionTiles[destIndex++];
    }
  }
}

export function tileRegionIsEmpty(tiles) {
  return tiles && !tiles.filter(tile => tile !== undefined).length;
}

export function pixelRect2TileRect(pixelRect) {
  return rect(
    pixel2Tile(pixelRect.x),
    pixel2Tile(pixelRect.y),
    pixel2Tile(pixelRect.width),
    pixel2Tile(pixelRect.height)
  );
}

export function tileInRange(tileX, tileY, range) {
  return !(
    tileX < range.x ||
    tileX >= range.x + range.width ||
    tileY < range.y ||
    tileY >= range.y + range.height
  );
}

export function fillAllTiles(tiles, tileId, emptyOnly = false) {
  for (let i = 0; i < tiles.length; i++) {
    if (!emptyOnly || typeof tiles[i] === 'undefined') {
      tiles[i] = tileId;
    }
  }
}

export function fillContiguousEmptyTiles(layerTiles, tileX, tileY, tileId, range, widthInTiles) {
  recursiveTileFill(layerTiles, tileX, tileY, tileId, range, widthInTiles, tileValue => typeof tileValue === 'undefined');
}

export function fillContiguousTargetTiles(layerTiles, tileX, tileY, tileId, range, widthInTiles) {
  const targetValue = layerTiles[flattenCoord(tileX, tileY, widthInTiles)];
  recursiveTileFill(layerTiles, tileX, tileY, tileId, range, widthInTiles, tileValue => tileValue === targetValue);
}

// TODO: JS is not optimized for this level of recursion. Make this NOT recursive.
export function recursiveTileFill(layerTiles, tileX, tileY, tileId, range, widthInTiles, predicate) {
  const tilePosition = flattenCoord(tileX, tileY, widthInTiles);

  if (!predicate(layerTiles[tilePosition]) || !tileInRange(tileX, tileY, range)) {
    return;
  }

  layerTiles[tilePosition] = tileId;

  recursiveTileFill(layerTiles, tileX - 1, tileY, tileId, range, widthInTiles, predicate);
  recursiveTileFill(layerTiles, tileX + 1, tileY, tileId, range, widthInTiles, predicate);
  recursiveTileFill(layerTiles, tileX, tileY - 1, tileId, range, widthInTiles, predicate);
  recursiveTileFill(layerTiles, tileX, tileY + 1, tileId, range, widthInTiles, predicate);
}
