/**
 * Created by shaunwest on 11/29/15.
 */

import * as TileTypes from './tile-types.js';
import { unFlattenXDimension, unFlattenYDimension } from './geom.js'; 
import Looper, { TARGET_FPS, CONTINUE_RENDERING } from './looper.js';

export default function tileRenderer (context, tiles, tileSize, tileSequences, width, height) {
  const tileFrameIndexes = [];
  const _RENDER_LOOP = Looper();

  return _RENDER_LOOP((fps, elapsed, vFrameCount, aFrameCount) => {
    const tilesLength = tiles.length * tileSize;
    const canvasWidth = unFlattenXDimension(tilesLength, width);
    const canvasHeight = unFlattenYDimension(tilesLength, width);
    const widthInTiles = Math.floor(canvasWidth / tileSize);
    const currentTiles = getCurrentTiles(tileSequences, vFrameCount);

    _CLEAR_TILES(context, canvasWidth, canvasHeight);
    _DRAW_TILES(context, tiles, currentTiles, widthInTiles, tileSize);

    return CONTINUE_RENDERING;
  });
}

function getCurrentTiles(tileSequences, frameCount) {
  const tiles = [];
  const numSequences = tileSequences.length;

  for (let i = 0; i < numSequences; i++) {
    const type = tileSequences[i].type || 'basic';
    const tileImage = TileTypes[type](tileSequences[i], TARGET_FPS, frameCount);
    tiles.push(tileImage);
  }

  return tiles;
}

function _DRAW_TILES(context, mapTiles, tileSet, widthInTiles, tileSize) {
  const numMapTiles = mapTiles.length;

  for(let i = 0; i < numMapTiles; i++) {
    const tileSetIndex = mapTiles[i];

    if (typeof tileSetIndex === 'undefined') {
      continue;
    }

    const tileImage = tileSet[tileSetIndex];

    if (!tileImage) {
      continue;
    }

    const x = i % widthInTiles;
    const y = Math.floor(i / widthInTiles);

    _DRAW_TILE(context, tileImage, x * tileSize, y * tileSize);
  }
}

function _CLEAR_TILES(context, width, height) {
  context.clearRect(0, 0, width, height);
}

function _DRAW_TILE(context, tileImage, x, y) {
  context.drawImage(tileImage, x, y);
}
