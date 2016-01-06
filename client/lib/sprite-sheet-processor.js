/**
 * Created by shaunwest on 9/13/15.
 */

import { Map, Range } from 'immutable';

// TODO: genericize
const TILE_SIZE = 16;

export function processSprites(image, sprites) {
  return sprites.map(function (spriteData) {
    const frames = getSprite(image, spriteData);
    const newSpriteData = spriteData.mergeDeepIn(['frames'], frames);
    return newSpriteData;
  });
}

export function getSprite(image, spriteData) {
  const width = spriteData.get('width');
  const height = spriteData.get('height');
  const frameSets = spriteData.get('frames');

  return frameSets ? 
    frameSets.reduce((reduction, frameSet, name) => {
      return reduction.setIn([name,'images'], 
        getSequence(
          image,
          frameSet.get('x'),
          frameSet.get('y'),
          width,
          height,
          frameSet.get('xRange')
        )
      );
    }, Map()) :
    Map({
      base: Map({
        images: getSequence(
          image,
          spriteData.get('x'),
          spriteData.get('y'),
          width,
          height,
          spriteData.get('xRange')
        )
      })
    });
}

export function getSequence(image, x = 0, y = 0, width = TILE_SIZE, height = TILE_SIZE, xRange = 1) {
  const rangeEnd = x + (width * xRange);
  return Range(x, rangeEnd, width)
    .map(x => makeSpriteImage(image, x, y, width, height));
}

function makeSpriteImage(image, x, y, width, height) {
  const canvas = document.createElement('canvas');
  canvas.width  = width;
  canvas.height = height;

  const canvasContext = canvas.getContext('2d');
  canvasContext.drawImage(
    image,
    x, y,
    width, height,
    0, 0,
    width, height
  );

  return canvas;
}
