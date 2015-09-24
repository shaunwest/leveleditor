/**
 * Created by shaunwest on 8/22/15.
 */

import Ractive from 'ractive';
import store from '../store.js';
import { Map } from 'immutable';
import { selectTile } from '../actions/tile-sheets.js';


const TileSelect = Ractive.extend({
  template: '#tileSelect',
  oninit: function () {
    store.subscribe(() => {
      const tileSheetState = store.getState().tileSheets;
      const tileSheets = tileSheetState.get('items');
      const tileSheetId = tileSheetState.get('currentTileSheetId');

      if (!tileSheets.size || !tileSheetId) {
        return;
      }

      const tileSheet = tileSheets.get(tileSheetId);
      if (!tileSheet.size) {
        return;
      }
      this.set('tileSheet', Object.assign({}, this.get('tileSheet'), tileSheet.toJS()));

      const tileImages = tileSheet.get('tileImages');
      if (!tileImages || !tileImages.size) {
        return;
      }

      const newTileImages = tileImages.map(function (tileImageSet) {
        return Map({ 
          tiles: tileImageSet.map(function (tileImage) {
            return tileImage.toDataURL();
          })
        });
      });

      this.set('tileImages', newTileImages.toJS());
    });

    this.on('selectTile', (event, tileIndex) => {
      store.dispatch(selectTile(tileIndex));
    });
  },
  data: function () {
    return {
      tileSheet: {},
      tileImages: [],
			foobar: ''
    };
  }
});

export default TileSelect;
