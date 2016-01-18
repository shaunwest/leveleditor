/**
 * Created by shaunwest on 10/11/15.
 */

import page from 'page';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../store.js';

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
  return dispatch => {
    routes.forEach((route) => {
      page(route.path, (context, next) => {
        dispatch(receiveRoute(context.path, context));
        if (null && typeof route.view === 'function') {
          route.view();
        } else {
          ReactDOM.render(<Provider store={store}>{ React.createElement(route.view, {description: 'fooo'}) }</Provider>, document.getElementById('view'));
        }
      });
    });

    page();
  };
}

export function navigateTo(path) {
  return dispatch => {
    dispatch(requestRoute(path));
    page(path);
  };
}
