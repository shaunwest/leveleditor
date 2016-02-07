/**
 * Created by shaunwest on 1/2/16.
 */

import { flattenCoord, unFlattenXDimension } from './util/geom.js'; 
import { pixel2Tile } from './util/tile-tools.js';

// NOTE: currently it's impossible to shift the viewport into a 
// "non-snapped" position

export function fixed(spriteIdList, currentSpriteSet, spriteSize, regionWidth, viewport, spriteFunc) {
  const numSprites = (spriteIdList) ? spriteIdList.length : 0;
  const spriteListLength = numSprites * spriteSize;
  //const canvasWidth = unFlattenXDimension(spriteListLength, regionWidth);
  //const gridWidth = Math.floor(canvasWidth / spriteSize);
  const widthInTiles = pixel2Tile(regionWidth);
  const startX = pixel2Tile(viewport.x);
  const startY = pixel2Tile(viewport.y);
  const endX = Math.min(startX + pixel2Tile(viewport.width), regionWidth);
  const endY = startY + pixel2Tile(viewport.height);

  for(let x = startX; x < endX; x++) {
    for(let y = startY; y < endY; y++) {
      const spriteIndex = flattenCoord(x, y, widthInTiles);
      const spriteSetId = spriteIdList[spriteIndex];

      if (typeof spriteSetId === 'undefined') {
        continue;
      }

      const spriteImage = currentSpriteSet[spriteSetId];

      if (!spriteImage) {
        continue;
      }

      spriteFunc(spriteImage, (x * spriteSize) - (startX * spriteSize), (y * spriteSize) - (startY * spriteSize));
    }
  }
}
