/**
 * Created by shaunwest on 8/22/15.
 */

import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

export default store;
