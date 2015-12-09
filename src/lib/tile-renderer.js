/**
 * Created by shaunwest on 11/29/15.
 */

import * as TileTypes from './tile-types.js';
import Looper, { TARGET_FPS, CONTINUE_RENDERING } from './looper.js';

const LOOP_ID = 'tileRenderer';

export default function tileRenderer (context, tiles, tileSize, tileSequences, width, height) {
  const tileFrameIndexes = [];
  const _RENDER_LOOP = Looper(width); // FIXME: this id needs to be something else. Is it even needed?
  const widthInTiles = Math.floor(width / tileSize);

  return _RENDER_LOOP((fps, elapsed, vFrameCount, aFrameCount) => {
    const currentTiles = getCurrentTiles(tileSequences, vFrameCount);

    context.clearRect(0, 0, width, height);
    drawTiles(context, tiles, currentTiles, widthInTiles, tileSize);

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

function drawTiles(context, mapTiles, tileSet, widthInTiles, tileSize) {
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

    drawTile(context, tileImage, x * tileSize, y * tileSize);
  }
}

function drawTile(context, tileImage, x, y) {
  context.drawImage(tileImage, x, y);
}
