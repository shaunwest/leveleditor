/**
 * Created by shaunwest on 9/10/15.
 */

import page from 'page';
import store from '../../store.js';

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

// TODO: can this be called with dispatch so we don't need to import store here?
export function initRouting(routes) {
  routes.forEach(function (route) {
    page(route.path, function (context, next) {
      store.dispatch(receiveRoute(context.path, context));
      if (typeof route.view === 'function') {
        route.view(store);
      }
    });
  });

  page();
}


export function navigateTo(path) {
  return dispatch => {
    dispatch(requestRoute(path));
    page(path);
  };
}
