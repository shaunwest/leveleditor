import { rect } from '../util/geom.js';
import { snap } from './snap.js';

export function Pointer(width, height) {
  return function (pointerPos) {
    return getPointer(pointerPos.x, pointerPos.y, width, height);
  };
}

export function getPointer(x, y, width, height) {
  return rect(
    snap(x),
    snap(y), 
    width,
    height
  );
}
