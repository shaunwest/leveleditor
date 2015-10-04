/**
 * Created by shaunwest on 8/23/15.
 */

import { combineReducers } from 'redux';
import levels from './levels/levels.js';
import tileSheets from './tile-sheets/tile-sheets.js';
import currentTileSet from './tile-sheets/current-tile-set.js';
import routes from './routes/routes.js';
import layers from './layers/layers.js';

const rootReducer = combineReducers({
  levels, layers, tileSheets, currentTileSet, routes
});

export default rootReducer;
