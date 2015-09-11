/**
 * Created by shaunwest on 8/22/15.
 */

import Ractive from 'ractive';
import store from '../store.js';
import { selectTileSheet } from '../actions/tile-sheets.js';

const TileSheetSelect = Ractive.extend({
  template: '#tileSheetSelect',
  oninit: function () {
    store.subscribe(() => {
      const source = store.getState().tileSheets;
      const sourceData = (source.has('items')) ?
        source.get('items') :
        source;

      if (!sourceData.size) {
        return;
      }

      this.set('tileSheets', Object.assign({}, this.get('tileSheets'), sourceData.toJS()));
    });

    this.on('select', (event) => {
      store.dispatch(selectTileSheet(event.context.id));
    });
  },
  data: function () {
    return {
      tileSheets: {}
    };
  }
});

export default TileSheetSelect;