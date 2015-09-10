/**
 * Created by shaunwest on 9/7/15.
 */

import store from '../store.js';
import { fetchTileSheets, fetchTileSheet, selectTileSheet } from '../actions/tile-sheets.js';

export default function TileSheetsController() {
  store.dispatch(fetchTileSheets('/data/tile-sheets.json'))
    .then(() => {
      store
        .getState()
        .tileSheets
        .get('items')
        .toSeq()
        .forEach((tileSheet, src) => {
          store.dispatch(fetchTileSheet(src));
        });
    });
}