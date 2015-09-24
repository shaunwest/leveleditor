/**
 * Created by shaunwest on 9/10/15.
 */

import page from 'page';
import store from '../store.js';
import { getView } from '../view.js';

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

export function initRouting(routes) {
  routes.forEach(function (route) {
    const view = getView(route.template, route.components, route.controllers);

    page(route.path, function (context, next) {
      store.dispatch(receiveRoute(context.path, context));
      view();
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
