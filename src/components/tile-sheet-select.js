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
      const tileSheets = store.getState().tileSheets.get('items');

      if (!tileSheets.size) {
        return;
      }

      this.set('tileSheets', Object.assign({}, this.get('tileSheets'), tileSheets.toJS()));
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