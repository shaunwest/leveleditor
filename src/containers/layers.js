/**
 * Created by shaunwest on 8/22/15.
 */

import Ractive from 'ractive';
import { addTile, removeTile } from '../modules/layers/update-layer.js';

function getTilePosition(pixelX, pixelY, width) {
  const widthInTiles = Math.floor(width / 16),
    tileY = Math.floor(pixelY / 16),
    tileX = Math.floor(pixelX / 16);

  return (tileY * widthInTiles) + tileX;
}

function getCurrentTileIndex(state) {
  return state.currentTileSet.get('currentTileIndex');
}

export default Ractive.extend({
  template: '#layers',
  oninit: function () {
    const store = this.get('store');
    //const mockLayers = [{ tiles: [] }];

    this.on('Layer.addTile', (mouseEvent) => {
      const tilePosition = getTilePosition(mouseEvent.offsetX, mouseEvent.offsetY, this.get('width')),
        tileIndex = getCurrentTileIndex(store.getState());

      store.dispatch(addTile(tilePosition, tileIndex));
      //mockLayers[0].tiles[tilePosition] = tileIndex;
      //this.set('layers', mockLayers);
    });

    this.on('Layer.removeTile', (mouseEvent) => {
      const tilePosition = getTilePosition(mouseEvent.offsetX, mouseEvent.offsetY, this.get('width'));
      store.dispatch(removeTile(tilePosition));
    });

    store.subscribe(() => {
      const state = store.getState(),
        tileSet = state.currentTileSet;

      this.set('toolId', state.tools.get('selectedId'));
      this.set('tileImages', tileSet.get('tileImages'));
      this.set('layers', state.layers.get('items').toArray());
      //this.set('layers', mockLayers);
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
