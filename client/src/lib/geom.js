/**
 * Created by shaunwest on 11/27/15.
 */

export function point(x = 0, y = 0) {
  return {
    x,
    y
  };
}

export function dist(point1, point2) {
  return {
    x: Math.abs(point1.x - point2.x),
    y: Math.abs(point1.y - point2.y)
  };
}

export function isMinDist(dist, x, y) {
  return (dist.x >= x && dist.y >= y);
}

export function pointFromRect(rect) {
  return {
    x: rect.x,
    y: rect.y
  };
}

export function rect(x = 0, y = 0, width = 100, height = 100) {
  return {
    x,
    y,
    width,
    height
  };
}

export function rectHasMinSize(rect, width, height) {
  return (Math.abs(rect.width) >= width && Math.abs(rect.height) >= height);
}

export function rectContainsPoint(point, rect) {
  return (point.x >= rect.x && point.x < rect.x + rect.width && 
    point.y >= rect.y && point.y < rect.y + rect.height);
}

export function flattenCoord(x, y, targetWidth) {
  return (y * targetWidth) + x;
}

export function unFlattenXCoord(value, targetWidth) {
  return value % targetWidth;
}

export function unFlattenYCoord(value, targetWidth) {
  return Math.floor(value / targetWidth);
}

export function unFlattenXDimension(value, targetWidth) {
  return Math.min(value, targetWidth);
}

// TODO can this be computed without units? (tileSize)
export function unFlattenYDimension(value, targetWidth) {
  const width = unFlattenXDimension(value, targetWidth);
  return width;
  //return unFlattenYCoord(value, targetWidth);
}

export function unFlattenCoord(value, targetWidth) {
  return {
    x: unFlattenXCoord(value, targetWidth),
    y: unFlattenYCoord(value, targetWidth)
  };
}

export function unFlattenDimensions(value, targetWidth) {
  return {
    width: unFlattenXDimension(value, targetWidth),
    height: unFlattenYDimension(value, targetWidth)
  };
}
