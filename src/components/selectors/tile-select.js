/**
 * Created by shaunwest on 8/22/15.
 */

import Ractive from 'ractive';
import { Map } from 'immutable';

const TileSelect = Ractive.extend({
  template: '#tileSelect',
  oninit: function () {
    const store = this.get('store');
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
  },
  data: function () {
    return {
      tileImages: []
    };
  }
});

export default TileSelect;
