/**
 * Created by shaunwest on 8/23/15.
 */

import { combineReducers } from 'redux';
import { Map } from 'immutable';
import levels from './levels.js';
import tileSheets from './tile-sheets.js';

const rootReducer = combineReducers({
  levels, tileSheets
});

export default rootReducer;