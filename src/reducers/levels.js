/**
 * Created by shaunwest on 9/7/15.
 */

import { Map } from 'immutable';
import {
  REQUEST_LEVELS, RECEIVE_LEVELS, SELECT_LEVEL,
  REQUEST_LEVEL, RECEIVE_LEVEL, RECEIVE_LEVEL_ERROR
  } from '../actions/levels.js';
import { ADD_TILE } from '../actions/layer.js';
import { RECEIVE_ROUTE } from '../actions/routes.js';

const DEFAULT_THUMB = 'default-thumbnail.png';

export default function levels(state = Map({
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
      return state.mergeIn(['items', action.src], { isFetching: true });
    case RECEIVE_LEVEL:
      return state.mergeIn(['items', action.src], { isFetching: false}, action.level);
    case RECEIVE_LEVEL_ERROR:
      return state.mergeIn(['items', action.src], {
        isFetching: false,
        isError: true,
        thumbnail: DEFAULT_THUMB
      });
    case RECEIVE_ROUTE:
      const levelId = action.context.params.levelId;
      return (levelId) ?
        state.set('currentLevelId', levelId) :
        state;
    /*case ADD_TILE:
      return state.setIn(['items', action.src, 'layers', 0, 'tiles', action.index], action.id);*/
    default:
      return state;
  }
}
