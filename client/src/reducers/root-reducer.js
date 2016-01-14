/**
 * Created by shaunwest on 8/23/15.
 */

import { combineReducers } from 'redux-immutablejs';

import levels from './levels.js';
import tileSheets from './tile-sheets.js';
import currentTileSet from './current-tile-set.js';
import routes from './routes.js';
import layers from './layers.js';
import activeLayer from './active-layer.js';
import tools from './tools.js';
import filters from './filters.js';
import tiledLayouts from './tiled-layouts.js';

import { Map } from 'immutable';

const rootReducer = combineReducers(Map({
  routes,
  levels,
  layers,
  activeLayer,
  tileSheets,
  tools,
  currentTileSet,
  filters,
  tiledLayouts
}));

export default rootReducer;
