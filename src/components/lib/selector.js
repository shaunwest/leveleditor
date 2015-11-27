import { point, rect } from './geom.js';
import { snap } from './snap.js';

export const RESIZE_LEFT = 'resizeLeft',
  RESIZE_TOP = 'resizeTop',
  RESIZE_BOTTOM = 'resizeBottom',
  RESIZE_RIGHT = 'resizeRight',
  RESIZE_NONE = '';

// TODO: rename to ExpandableSelector
export function Selector() {
  return function (newPointerPos, oldPointerPos) {
    return rect(
      oldPointerPos.x,
      oldPointerPos.y,
      snap(newPointerPos.x - oldPointerPos.x),
      snap(newPointerPos.y - oldPointerPos.y)
    );
  }
}

export function MoveableSelector() {
  return function (originalPointerPos, newPointerPos, oldSelector) {
    const diff = point(
      newPointerPos.x - originalPointerPos.x,
      newPointerPos.y - originalPointerPos.y
    );

    return rect(
      snap(diff.x),
      snap(diff.y),
      oldSelector.width,
      oldSelector.height
    );
  }
}

export function ResizableSelector() {
  return function (pointerPos, oldSelector, side) {
    switch(side) {
      case RESIZE_LEFT:
        return rect(
          snap(pointerPos.x),
          oldSelector.y,
          oldSelector.width + (oldSelector.x - snap(pointerPos.x)),
          oldSelector.height
        );
      case RESIZE_RIGHT:
        return rect(
          oldSelector.x,
          oldSelector.y,
          snap(pointerPos.x - oldSelector.x),
          oldSelector.height
        );
      case RESIZE_TOP:
        return rect(
          oldSelector.x,
          snap(pointerPos.y),
          oldSelector.width,
          oldSelector.height + (oldSelector.y - snap(pointerPos.y))
        );
      case RESIZE_BOTTOM:
        return rect(
          oldSelector.x,
          oldSelector.y,
          oldSelector.width,
          snap(pointerPos.y - oldSelector.y)
        );
      default:
        return oldSelector;
    }
  }
}

function rectContains(rect, point) {
  return !(point.x < rect.x || point.y < rect.y || point.x > rect.x + rect.width || point.y > rect.y + rect.height);
}

export function getResizeSide(pointerPos, selector, deviation = 5) {
  if (!selector) {
    return RESIZE_NONE;
  }

  if (rectContains(rect(selector.x, selector.y - deviation, selector.width, deviation * 2), pointerPos)) {
    return RESIZE_TOP;
  }

  if (rectContains(rect(selector.x - deviation, selector.y, deviation * 2, selector.height), pointerPos)) {
    return RESIZE_LEFT;
  }

  if (rectContains(rect(selector.x, (selector.y + selector.height) - deviation, selector.width, deviation * 2), pointerPos)) {
    return RESIZE_BOTTOM;
  }

  if (rectContains(rect((selector.x + selector.width) - deviation, selector.y, deviation * 2, selector.height), pointerPos)) {
    return RESIZE_RIGHT;
  }

  return RESIZE_NONE;
}
