/**
 * Created by shaunwest on 9/10/15.
 */

import page from 'page';
import store from '../store/store.js';
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
    //const view = getView(route.template, route.components, route.controller);
    const view = getView(route.template, route.components);

    page(route.path, function (context, next) {
      // In the controller is where "selectLevel" can be called
      // When selectLevel is called, current-tile-set reducer can set it's state based on it
      
      store.dispatch(receiveRoute(context.path, context));
      if (typeof route.controller === 'function') {
        route.controller();
      }

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
