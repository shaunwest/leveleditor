/**
 * Created by shaunwest on 11/27/15.
 */

export function point(x = 0, y = 0) {
  return {
    x,
    y
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
