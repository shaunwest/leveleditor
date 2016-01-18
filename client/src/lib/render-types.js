/**
 * Created by shaunwest on 1/2/16.
 */

import { unFlattenXDimension } from './geom.js'; 

export function fixed(spriteIdList, currentSpriteSet, spriteSize, regionWidth, spriteFunc) {
  const numSprites = (spriteIdList) ? spriteIdList.length : 0;
  const spriteListLength = numSprites * spriteSize;
  const canvasWidth = unFlattenXDimension(spriteListLength, regionWidth);
  const gridWidth = Math.floor(canvasWidth / spriteSize);

  for(let i = 0; i < numSprites; i++) {
    const spriteSetId = spriteIdList[i];

    if (typeof spriteSetId === 'undefined') {
      continue;
    }

    const spriteImage = currentSpriteSet[spriteSetId];

    if (!spriteImage) {
      continue;
    }

    const x = i % gridWidth;
    const y = Math.floor(i / gridWidth);

    spriteFunc(spriteImage, x * spriteSize, y * spriteSize);
  }
}
