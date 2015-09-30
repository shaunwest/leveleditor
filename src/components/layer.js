/**
 * Created by shaunwest on 8/22/15.
 */

import Ractive from 'ractive';
import { addTile } from '../actions/layer.js';
import store from '../store/store.js';
import { getCurrentLevelId } from '../store/helpers.js';
import { frame } from '../util/frame.js';

const Layer = Ractive.extend({
  template: '#layer',
  oninit: function () {
    const currentLevelId = getCurrentLevelId();
    let isMouseDown = false;

    this.on('mouseDown', event => {
      isMouseDown = true; 
      // LayerCanvas automatically updates when state changes
    });

    this.on('mouseUp', event => {
      isMouseDown = false;
    });

    this.on('mouseMove', event => {
      if (!isMouseDown) {
        return;
      }
      const mouseEvent = event.original;
      const width = 400;
      const tilePosition = (mouseEvent.offsetY * width) + mouseEvent.offsetX;
      const tileIndex = 1;

      store.dispatch(addTile(currentLevelId, tilePosition, tileIndex));
    });
  },
  oncomplete: function () {
    const canvas = this.find('canvas');
    const context = canvas.getContext('2d');
    const getFrame = frame();

/*
    getFrame((elapsed, fps) => {
      
    });
*/

    store.subscribe(() => {
      const layers = store.getState().layers;
      const tileSet = store.getState().currentTileSet;
      const tileImages = tileSet.get('tileImages');
      const activeLayerIndex = layers.get('activeLayerIndex');
      const layer = layers.get('items').get(activeLayerIndex);
      const tiles = layer.get('tiles');
      const width = 400;
      
      for(let i = 0; i < tiles.size; i++) {
        let x = i % width;
        let y = Math.floor(i / width);
        let tileIndex = tiles.get(i);
        if (typeof tileIndex !== 'undefined') {
          let tileImage = tileImages.get(tileIndex).get(0);
          context.drawImage(tileImage, x, y);
        }
      }
    });
  },
  data: function () {
    return {
      layer: null
    };
  }
});

export default Layer;
