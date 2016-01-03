/**
 * Created by shaunwest on 11/29/15.
 */

//import * as TileTypes from './tile-types.js';
import { getCurrentFrames } from './sprite-sequencer.js';
import { unFlattenXDimension, unFlattenYDimension } from './geom.js'; 
import Looper, { TARGET_FPS } from './looper.js';
import { fixed } from './render-types.js'; // TODO: should be passed in instead

export default function fixedRenderer (context, spriteList, size, spriteSequences, regionWidth, viewport) {
  const tileFrameIndexes = [];
  const renderLoop = Looper();

  function _DRAW_SPRITE(spriteImage, x, y) {
    context.drawImage(spriteImage, x, y);
  }

  return renderLoop((fps, elapsed, vFrameCount, aFrameCount) => {
    const currentTiles = getCurrentFrames(spriteSequences, vFrameCount);

    _CLEAR_SPRITES(context, viewport.width, viewport.height);

    fixed(spriteList, currentTiles, size, regionWidth, _DRAW_SPRITE);
    //_DRAW_SPRITES(context, spriteList, currentTiles, widthInTiles, size);
  });
}

/*
export default function fixedRenderer (context, sprites, size, spriteSequences, width, height) {
  const tileFrameIndexes = [];
  const renderLoop = Looper();

  return renderLoop((fps, elapsed, vFrameCount, aFrameCount) => {
    const spritesLength = sprites.length * size;
    const canvasWidth = unFlattenXDimension(spritesLength, width);
    const canvasHeight = unFlattenYDimension(spritesLength, width);
    const widthInTiles = Math.floor(canvasWidth / size);
    //const currentTiles = getCurrentSprites(spriteSequences, vFrameCount);
    const currentTiles = getCurrentFrames(spriteSequences, vFrameCount);

    _CLEAR_SPRITES(context, canvasWidth, canvasHeight);
    _DRAW_SPRITES(context, sprites, currentTiles, widthInTiles, size);
  });
}
*/

/*
function getCurrentSprites(spriteSequences, frameCount) {
  const sprites = [];
  const numSequences = spriteSequences.length;

  for (let i = 0; i < numSequences; i++) {
    const type = spriteSequences[i].type || 'basic';
    const spriteImage = TileTypes[type](spriteSequences[i], TARGET_FPS, frameCount);
    sprites.push(spriteImage);
  }

  return sprites;
}

function _DRAW_SPRITES(context, mapTiles, spriteSet, widthInTiles, size) {
  const numMapTiles = mapTiles.length;

  for(let i = 0; i < numMapTiles; i++) {
    const spriteSetIndex = mapTiles[i];

    if (typeof spriteSetIndex === 'undefined') {
      continue;
    }

    const spriteImage = spriteSet[spriteSetIndex];

    if (!spriteImage) {
      continue;
    }

    const x = i % widthInTiles;
    const y = Math.floor(i / widthInTiles);

    _DRAW_SPRITE(context, spriteImage, x * size, y * size);
  }
}
*/

function _CLEAR_SPRITES(context, width, height) {
  context.clearRect(0, 0, width, height);
}

/*
function _DRAW_SPRITE(context, spriteImage, x, y) {
  context.drawImage(spriteImage, x, y);
}
*/
