/**
 * Created by shaunwest on 8/23/15.
 */

import { combineReducers } from 'redux';
import { Map } from 'immutable';
import {
  REQUEST_LEVELS, RECEIVE_LEVELS, SELECT_LEVEL,
  REQUEST_LEVEL, RECEIVE_LEVEL, RECEIVE_LEVEL_ERROR
} from './actions.js';

const DEFAULT_THUMB = 'default-thumbnail.png';

function selectedLevel(state = 'foo', action = {}) {
  switch (action.type) {
    case SELECT_LEVEL:
      return action.src;
    default:
      return state;
  }
}

function levels(state = Map({
  isFetching: false,
  items: Map()
}), action = {}) {
  switch (action.type) {
    case REQUEST_LEVELS:
      return state.set('isFetching', true);
    case RECEIVE_LEVELS:
      return state.mergeDeep({
        isFetching: false,
        items: action.levels,
        lastUpdated: action.receivedAt
      });
    case REQUEST_LEVEL:
      return state.setIn(['items', action.src], { isFetching: true });
    case RECEIVE_LEVEL:
      return state.mergeDeepIn(['items', action.src], { isFetching: false }, action.level);
    case RECEIVE_LEVEL_ERROR:
      return state.setIn(['items', action.src], {
        isFetching: false,
        isError: true,
        thumbnail: DEFAULT_THUMB
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  levels
});

export default rootReducer;