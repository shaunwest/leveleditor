/**
 * Created by shaunwest on 9/7/15.
 */

import store from '../store/store.js';
import { fetchLevel, fetchAndSelectLevel } from '../actions/levels.js';
import { fetchAll as fetchAllTileSheets } from '../actions/tile-sheets.js';

export default function levelViewController() {
  const levelId = store
    .getState()
    .levels
    .get('currentLevelId');

  //store.dispatch(fetchLevel(levelId));
  store.dispatch(fetchAndSelectLevel(levelId));
  store.dispatch(fetchAllTileSheets('/data/tile-sheets.json'));
}
