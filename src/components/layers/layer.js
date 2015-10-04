/**
 * Created by shaunwest on 8/22/15.
 */

import Ractive from 'ractive';
import frame from './lib/frame.js';

function drawTiles(context, tiles, tileImages, width) {
  for(let i = 0; i < tiles.size; i++) {
    const x = i % width,
      y = Math.floor(i / width),
      tileIndex = tiles.get(i);

    if (typeof tileIndex !== 'undefined') {
      const tileImage = tileImages.get(tileIndex).get(0);
      context.drawImage(tileImage, x, y);
    }
  }
}

const CONTINUE = true;

const Layer = Ractive.extend({
  template: '#layer',
  oninit: function () {
    let isMouseDown = false;

    this.on('mouseDown', event => {
      isMouseDown = true; 
    });

    this.on('mouseUp', event => {
      isMouseDown = false;
    });

    this.on('mouseMove', event => {
      if (!isMouseDown) {
        return;
      }
      
      this.fire('addTile', event.original);
    });
  },
  oncomplete: function () {
    const canvas = this.find('canvas'),
      context = canvas.getContext('2d'),
      getFrame = frame(),
      width = this.get('width');

    getFrame((elapsed, fps) => {
      const tileImages = this.get('tileImages'),
        layer = this.get('layer'),
        tiles = layer.get('tiles');

      drawTiles(context, tiles, tileImages, width);

      return CONTINUE;
    });
  },
  data: function () {
    return {
      layer: null,
      tileImages: [],
      width: 400
    };
  }
});

export default Layer;
