/**
 * Created by shaunwest on 8/22/15.
 */

import thunkMiddleware from 'redux-thunk';
//import loggerMiddleware from 'redux-logger';
import logger from './middleware/logger.js';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './modules/root-reducer.js';
import { Immutable, Map } from 'immutable';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware // lets us dispatch() functions
  //logger
  //loggerMiddleware // neat middleware that logs actions
)(createStore);

//const state = Immutable.fromJS({});
//const store = createStoreWithMiddleware(rootReducer, state);

const store = createStoreWithMiddleware(rootReducer);

export default store;
