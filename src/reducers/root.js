/**
 * Created by shaunwest on 8/23/15.
 */

import { combineReducers } from 'redux';
import { Map } from 'immutable';
import levels from './levels.js';
import tileSheets from './tile-sheets.js';
import routes from './routes.js';

const rootReducer = combineReducers({
  levels, tileSheets, routes
});

export default rootReducer;