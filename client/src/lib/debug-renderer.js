/**
 * Created by shaunwest on 12/20/15.
 */

import { unFlattenXDimension, unFlattenYDimension } from './geom.js'; 
import Looper, { TARGET_FPS } from './looper.js';

export default function spriteRenderer (context, width, height) {
  const renderLoop = Looper();

  return renderLoop((fps, elapsed, vFrameCount, aFrameCount) => {
    _CLEAR(context, canvasWidth, canvasHeight);
    _DRAW(context, tiles, currentTiles, widthInTiles, size);
  });
}

function _DRAW(context, mapTiles, tileSet, widthInTiles, size) {
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

    _DRAW_SOMETHING(context, tileImage, x * size, y * size);
  }
}

function _CLEAR(context, width, height) {
  context.clearRect(0, 0, width, height);
}

function _DRAW_SOMETHING(context, tileImage, x, y) {
  context.drawImage(tileImage, x, y);
}
