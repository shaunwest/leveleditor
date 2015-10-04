/**
 * Created by shaunwest on 8/22/15.
 */

import Ractive from 'ractive';
import { addTile } from '../modules/layers/update-layer.js';
import { getCurrentLevelId } from '../helpers.js';

const Layers = Ractive.extend({
  template: '#layers',
  oninit: function () {
    const store = this.get('store');

    this.on('Layer.addTile', function (mouseEvent) {
      const state = store.getState(),
        currentLevelId = getCurrentLevelId(),
        tileSet = state.currentTileSet,
        width = this.get('width'),
        tilePosition = (mouseEvent.offsetY * width) + mouseEvent.offsetX,
        tileIndex = tileSet.get('currentTileIndex');

      store.dispatch(addTile(currentLevelId, tilePosition, tileIndex));
    });

    store.subscribe(() => {
      const state = store.getState(),
        tileSet = state.currentTileSet;

      this.set('tileImages', tileSet.get('tileImages'));
      this.set('layers', state.layers.get('items').toArray());
    });
  },
  data: function () {
    return {
      tileImages: [],
      layers: [],
      width: 400
    };
  }
});

export default Layers;
