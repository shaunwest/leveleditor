/**
 * Created by shaunwest on 8/23/15.
 */

//import { combineReducers } from 'redux';
import { combineReducers } from 'redux-immutablejs';

import levels from './levels/levels.js';
import tileSheets from './tile-sheets/tile-sheets.js';
import currentTileSet from './tile-sheets/current-tile-set.js';
import routes from './routes/routes.js';
import layers from './layers/layers.js';
import tools from './tools/tools.js';

import { Map } from 'immutable';

const rootReducer = combineReducers(Map({
  routes, levels, layers, tileSheets, tools, currentTileSet,
}));

export default rootReducer;
