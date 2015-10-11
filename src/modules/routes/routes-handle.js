/**
 * Created by shaunwest on 9/10/15.
 */

import page from 'page';
import store from '../../store.js';
import { receiveRoute, requestRoute } from './routes-actions.js';

export function initRouting(routes) {
  return dispatch => {
    routes.forEach((route) => {
      page(route.path, (context, next) => {
        dispatch(receiveRoute(context.path, context));
        if (typeof route.view === 'function') {
          route.view(store);
        }
      });
    });

    page();
  }
}

export function navigateTo(path) {
  return dispatch => {
    dispatch(requestRoute(path));
    page(path);
  };
}
