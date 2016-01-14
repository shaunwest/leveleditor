/**
 * Created by shaunwest on 1/6/16.
 */

// WIP

import { Map } from 'immutable';
import {
  LOAD_LAYER
  } from './active-layer-actions.js';

export default function activeLayer(state = Map({
}), action = {}) {
  switch (action.type) {
    case LOAD_LAYER:
      return state.merge(action.layer);
    default:
      return state;
  }
}
