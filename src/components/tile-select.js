/**
 * Created by shaunwest on 8/22/15.
 */

import Ractive from 'ractive';
import store from '../store/store.js';
import { Map } from 'immutable';
import { selectTile } from '../actions/tile-sheets.js';

const TileSelect = Ractive.extend({
  template: '#tileSelect',
  oninit: function () {
    store.subscribe(() => {
      const tileSet = store.getState().currentTileSet,
        tileImages = tileSet.get('tileImages');

      if (!tileImages || !tileImages.size) {
        return;
      }

      // convert images to data urls for use with <img src>
      const dataUrls = tileImages.map(function (tileImageSet) {
        return Map({ 
          tiles: tileImageSet.map(function (tileImage) {
            return tileImage.toDataURL();
          })
        });
      });

      this.set('tileImages', dataUrls.toJS());
    });

    this.on('selectTile', (event, tileIndex) => {
      store.dispatch(selectTile(tileIndex));
    });
  },
  data: function () {
    return {
      tileImages: []
    };
  }
});

export default TileSelect;
