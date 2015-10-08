/**
 * Created by shaunwest on 9/7/15.
 */

import { Map } from 'immutable';
import { SELECTED_TOOL } from './select-tools.js';

export default function tools(state = Map({
  selectedId: 'tileBrush'
}), action = {}) {
  switch (action.type) {
    case SELECTED_TOOL:
      return state.set('selectedId', action.id);
    default:
      return state;
  }
}
