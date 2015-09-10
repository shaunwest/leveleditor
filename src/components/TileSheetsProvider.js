/**
 * Created by shaunwest on 9/1/15.
 */

import { Map } from 'immutable';
import { fetchTileSheets, fetchTileSheet, selectTileSheet } from '../actions/tile-sheets.js';
import Provider from './Provider.js';

const TileSheetsProvider = Provider.extend({
  oninit: function () {
    const store = this.get('store');

    store.subscribe(() => {
      const source = store.getState().tileSheets;
      const sourceData = (source.has('items')) ?
        source.get('items') :
        source;

      if (!sourceData.size) {
        return;
      }

      this.set('tileSheetsProvider', this.get('tileSheetsProvider').merge(sourceData));
    });

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

    this.on('TileSheetSelect.select', (event) => {
      store.dispatch(selectTileSheet(event.context.id));
    });
  },
  data: function () {
    return {
      tileSheetsProvider: Map()
    };
  }
});

export default TileSheetsProvider;
