/**
 * Created by shaunwest on 8/22/15.
 */

import Ractive from 'ractive';
import { addTile, removeTile } from '../modules/layers/layers-actions.js';
import { fillTilesWith } from '../modules/layers/layers-update.js';

function getTilePosition(pixelX, pixelY, width) {
  const widthInTiles = Math.floor(width / 16),
    tileY = Math.floor(pixelY / 16),
    tileX = Math.floor(pixelX / 16);

  return (tileY * widthInTiles) + tileX;
}

function getCurrentTileIndex(state) {
  return state.get('currentTileSet').get('currentTileIndex');
}

export default Ractive.extend({
  template: '#layers',
  oninit: function () {
    const store = this.get('store');

    this.on('Layer.addTile', (mouseEvent) => {
      const tilePosition = getTilePosition(mouseEvent.offsetX, mouseEvent.offsetY, this.get('width')),
        tileIndex = getCurrentTileIndex(store.getState());

      store.dispatch(addTile(tilePosition, tileIndex));
    });

    this.on('Layer.removeTile', (mouseEvent) => {
      const tilePosition = getTilePosition(mouseEvent.offsetX, mouseEvent.offsetY, this.get('width'));
      store.dispatch(removeTile(tilePosition));
    });

    this.on('Layer.fillTiles', (mouseEvent) => {
      const tileIndex = getCurrentTileIndex(store.getState());
      store.dispatch(fillTilesWith(tileIndex));
    });

    store.subscribe(() => {
      const state = store.getState(),
        tileSet = state.get('currentTileSet');

      this.set('toolId', state.get('tools').get('selectedId'));
      this.set('tileImages', tileSet.get('tileImages'));
      this.set('layers', state.get('layers').get('items').toArray());
    });
  },
  data: function () {
    return {
      tileImages: [],
      layers: [],
      width: 400,
      toolId: null
    };
  }
});
