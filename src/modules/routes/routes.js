/**
 * Created by shaunwest on 9/7/15.
 */

import { Map } from 'immutable';
import { REQUEST_ROUTE, RECEIVE_ROUTE } from './handle-routes.js';

export default function routes(state = Map({
  isFetching: false
}), action = {}) {
  switch (action.type) {
    case REQUEST_ROUTE:
      return state.set('isFetching', true);
    case RECEIVE_ROUTE:
      return state.mergeDeep({
        isFetching: false,
        // TODO: does this need to be an Object.assign()?
        context: Object.assign({}, action.context),
        path: action.path
      });
    default:
      return state;
  }
}
