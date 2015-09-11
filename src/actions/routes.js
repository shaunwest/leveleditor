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

export function addRoute(path, config) {
  const view = getView(config.template, config.components, config.controllers);

  page(path, function (context, next) {
    store.dispatch(receiveRoute(context.path, context));
    view(context, next);
  });
}

export function initRouting() {
  page();
}

export function navigateTo(path) {
  return dispatch => {
    dispatch(requestRoute(path));
    page(path);
  };
}
