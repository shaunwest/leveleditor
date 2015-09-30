/**
 * Created by shaunwest on 8/23/15.
 */

import { combineReducers } from 'redux';
import { Map } from 'immutable';
import levels from './levels.js';
import tileSheets from './tile-sheets.js';
import currentTileSet from './current-tile-set.js';
import routes from './routes.js';
import layers from './layers.js';

const rootReducer = combineReducers({
  levels, layers, tileSheets, currentTileSet, routes
});

export default rootReducer;
