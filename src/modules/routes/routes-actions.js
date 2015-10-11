/**
 * Created by shaunwest on 10/11/15.
 */

export const REQUEST_ROUTE = 'REQUEST_ROUTE';

export function requestRoute(path) {
  return { 
    type: REQUEST_ROUTE,
    path: path
  };
}

export const RECEIVE_ROUTE = 'RECEIVE_ROUTE';

export function receiveRoute(path, context) {
  return {
    type: RECEIVE_ROUTE,
    path: path,
    context: context
  };
}
