/**
 * Created by shaunwest on 8/23/15.
 */

import { combineReducers } from 'redux';
import { Map } from 'immutable';
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

function levels(state = Map({
  isFetching: false,
  items: Map()
}), action) {
  switch (action.type) {
    case REQUEST_LEVEL:
    case REQUEST_LEVELS:
      const newState = state.set('isFetching', true);
      return newState;
    case RECEIVE_LEVELS:
      return state.merge({
        isFetching: false,
        items: action.levels,
        lastUpdated: action.receivedAt
      });
    case RECEIVE_LEVEL:
      return state.setIn(['items', action.src], {thumbnail: 'smb.png'});
    default:
      return state;
  }
}
/*
function levels(state = {
  isFetching: false,
  items: Map()
}, action) {
  switch (action.type) {
    case REQUEST_LEVEL:
    case REQUEST_LEVELS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_LEVELS:
      return Object.assign({}, state, {
        isFetching: false,
        //items: Object.assign({}, state.items, action.levels),
        items: state.items.merge(action.levels),
        lastUpdated: action.receivedAt
      });
    case RECEIVE_LEVEL:
      //const item = Object.assign({}, state.items[action.src], { thumbnail: 'smb.png' });
      const item = Object.assign({}, state.items[action.src], { thumbnail: 'smb.png' });
      return Object.assign({}, state, {
        //items: Object.assign({}, state.items, {[action.src]: item})
        items: state.items.set(action.src, item)
      });
    default:
      return state;
  }
}
*/
const rootReducer = combineReducers({
  levels
});

export default rootReducer;