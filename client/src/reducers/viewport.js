/**
 * Created by shaunwest on 1/31/16.
 */

import { Map } from 'immutable';
import { UPDATE_VIEWPORT } from '../actions/viewport.js';

export default function viewport(state = Map({
  x: 0,
  y: 0,
  width: 400,
  height: 256,
  focusBox: Map() 
}), action = {}) {
  switch (action.type) {
    case UPDATE_VIEWPORT:
      return state.merge(action.viewport);
    default:
      return state;
  }
}
