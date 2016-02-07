/**
 * Created by shaunwest on 1/31/16.
 */

export const UPDATE_VIEWPORT = 'UPDATE_VIEWPORT';
export function updateViewport(viewport) {
  return {
    type: UPDATE_VIEWPORT,
    viewport
  };
}

/*
export function shiftViewport(delta) {
  return (dispatch, getState) => {
    const viewport = getState().get('viewport').toObject();
    viewport.x -= delta.x;
    viewport.y -= delta.y;

    dispatch(updateViewport(viewport));    
  };
}
*/
