/**
 * Created by shaunwest on 8/23/15.
 */

import { combineReducers } from 'redux';
import {
  REQUEST_LEVELS, RECEIVE_LEVELS, SELECT_LEVEL, REQUEST_LEVEL, RECEIVE_LEVEL
} from './actions.js';

function selectedLevel(state = 'foo', action) {
  switch (action.type) {
    case SELECT_LEVEL:
      return action.src;
    default:
      return state;
  }
}

function levels(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_LEVELS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_LEVELS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.levels,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  levels
});

export default rootReducer;