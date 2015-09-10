/**
 * Created by shaunwest on 8/22/15.
 */

import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/root.js';
import { Map } from 'immutable';

const logger = store => next => action => {
  console.log('Dispatching', action);
  let result = next(action);
  console.log('Next State', store.getState().levels.toJS());
  return result;
};

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  logger
  //loggerMiddleware // neat middleware that logs actions
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

export default store;
