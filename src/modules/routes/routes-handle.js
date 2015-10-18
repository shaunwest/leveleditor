/**
 * Created by shaunwest on 9/10/15.
 */

import page from 'page';
import ReactDOM from 'react-dom';
import React from 'react';
//import store from '../../store.js';
import { receiveRoute, requestRoute } from './routes-actions.js';

export function initRouting(routes) {
  return dispatch => {
    routes.forEach((route) => {
      page(route.path, (context, next) => {
        dispatch(receiveRoute(context.path, context));
        if (null && typeof route.view === 'function') {
          route.view();
        } else {
          ReactDOM.render(React.createElement(route.view, {description: 'fooo'}), document.getElementById('view'));
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
