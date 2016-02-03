/**
 * Created by shaunwest on 8/23/15.
 */

import { combineReducers } from 'redux-immutablejs';

import levels from './levels.js';
import tileSheets from './tile-sheets.js';
import routes from './routes.js';
import layers from './layers.js';
import filters from './filters.js';
import statuses from './statuses.js';
import viewport from './viewport.js';

import { Map } from 'immutable';

const rootReducer = combineReducers(Map({
  routes,
  levels,
  layers,
  tileSheets,
  filters,
  statuses,
  viewport
}));

export default rootReducer;
