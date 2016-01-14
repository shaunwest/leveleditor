/**
 * Created by shaunwest on 1/7/16.
 */

export const LOAD_LAYER = 'LOAD_LAYER';

export function loadLayer(layer) {
  return {
    type: LOAD_LAYER,
    layer
  };
}
