import { rect } from '../util/geom.js';
import { snap } from './snap.js';

export function Pointer(width, height) {
  return function (pointerPos) {
    return rect(
      snap(pointerPos.x),
      snap(pointerPos.y), 
      width,
      height
    );
  };
}
