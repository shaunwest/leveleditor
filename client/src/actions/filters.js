export const TOGGLE_LAYER = 'TOGGLE_LAYER';
export function toggleLayer(layerId, visible) {
  return {
    type: TOGGLE_LAYER,
    layerId,
    visible
  };
}

export const SELECT_LAYER = 'SELECT_LAYER';
export function selectLayer(layerId) {
  return {
    type: SELECT_LAYER,
    layerId
  };
}
