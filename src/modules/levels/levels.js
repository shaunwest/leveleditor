/**
 * Created by shaunwest on 9/7/15.
 */

import { Map } from 'immutable';
import {
  REQUEST_LEVELS, RECEIVE_LEVELS, SELECT_LEVEL,
  REQUEST_LEVEL, RECEIVE_LEVEL, RECEIVE_LEVEL_ERROR
  } from './levels-fetch.js';

import { RECEIVE_ROUTE } from '../routes/routes-actions.js';

const DEFAULT_THUMB = 'default-thumbnail.png';

export default function levels(state = Map({
  isFetching: false,
  items: Map()
}), action = {}) {
  switch (action.type) {
    case RECEIVE_ROUTE:
      /*console.log('Levels: RECEIVE ROUTE???');
      return state;*/
      const levelId = action.context.params.levelId;
      return (levelId) ?
        state.set('currentLevelId', levelId) :
        state;
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
    default:
      return state;
  }
}
