/**
 * Created by shaunwest on 9/7/15.
 */

import { Map } from 'immutable';
import {
  REQUEST_LEVELS, RECEIVE_LEVELS,
  REQUEST_LEVEL, RECEIVE_LEVEL, RECEIVE_LEVEL_ERROR
  } from '../actions/levels.js';

const DEFAULT_THUMB = 'default-thumbnail.png';

export default function levels(state = Map({
}), action = {}) {
  switch (action.type) {
    case RECEIVE_LEVELS:
      return state.merge(action.levels);
    case RECEIVE_LEVEL:
      return state.mergeIn([action.src], action.level);
    case RECEIVE_LEVEL_ERROR:
      return state.mergeIn([action.src], {
        thumbnail: DEFAULT_THUMB
      });
    default:
      return state;
  }
}
