/**
 * Created by shaunwest on 1/2/16.
 */

import * as TileTypes from './tile-types.js';
import { TARGET_FPS } from './looper.js';

export function getCurrentFrames(spriteSequences, frameCount) {
  const currentFrames = [];
  const numSequences = spriteSequences.length;

  for (let i = 0; i < numSequences; i++) {
    const type = spriteSequences[i].type || 'basic';
    const spriteImage = TileTypes[type](spriteSequences[i], TARGET_FPS, frameCount);
    currentFrames.push(spriteImage);
  }

  return currentFrames;
}
