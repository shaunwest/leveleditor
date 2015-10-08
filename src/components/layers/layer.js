/**
 * Created by shaunwest on 8/22/15.
 */

import Ractive from 'ractive';
import frame from './lib/frame.js';

const TILE_SIZE = 16,
  MAX_TILE_FRAMES = 16,
  CONTINUE = true;

function clearLayer(context, width, height) {
  context.clearRect(0, 0, width, height);
}

function drawTiles(context, tiles, tileImages, width, frameCount) {
  for(let i = 0; i < tiles.length; i++) {
    const tileIndex = tiles[i];

    if (typeof tileIndex === 'undefined') {
      continue;
    }

    const tileData = tileImages[tileIndex];
    if (!tileData) {
      continue;
    }

    const numImages = tileData.length,
      tileDataIndex = frameCount % numImages,
      tileImage = tileData[tileDataIndex],
      widthInTiles = Math.floor(width / TILE_SIZE),
      x = i % widthInTiles,
      y = Math.floor(i / widthInTiles);

    context.drawImage(tileImage, x * TILE_SIZE, y * TILE_SIZE);
  }
}

export default Ractive.extend({
  template: '#layer',
  oncomplete: function () {
    const canvas = this.find('canvas'),
      context = canvas.getContext('2d'),
      getRenderFrame = frame(),
      getInputFrame = frame();

    let frameCount = 0,
      isMouseDown = false,
      mouseLocation;

    this.on('mouseDown', event => {
      isMouseDown = true; 
      mouseLocation = event.original;
    });

    this.on('mouseUp', event => {
      isMouseDown = false;
      mouseLocation = null;
    });

    this.on('mouseMove', event => {
      if (!isMouseDown) {
        return;
      }
      mouseLocation = event.original;
    });

    /*
    var dummyCanvas = document.createElement('canvas');
    dummyCanvas.width = 16;
    dummyCanvas.height = 16;
    var c = dummyCanvas.getContext('2d');
    c.fillStyle = 'red';
    c.fillRect(0, 0, 16, 16);
    */

    getRenderFrame((elapsed, fps) => {
      const tileImages = this.get('tileImages'),
        layer = this.get('layer'),
        width = this.get('width'),
        height = this.get('height'),
        tiles = layer.get('tiles');
        //tiles = layer.tiles;

      clearLayer(context, width, height);
      drawTiles(context, tiles.toArray(), tileImages.toJS(), width, (frameCount === MAX_TILE_FRAMES) ? frameCount = 0 : frameCount++);

      return CONTINUE;
    });

    getInputFrame((elapsed, fps) => {
      this.set('fps', fps);

      if (isMouseDown) {
        switch(this.get('toolId')) {
          case 'eraser':
            this.fire('removeTile', mouseLocation);
            break;
          default:
            this.fire('addTile', mouseLocation);
        }
      }

      return CONTINUE;
    });
  },
  data: function () {
    return {
      layer: null,
      fps: 0,
      tileImages: [],
      width: 400,
      height: 400,
      toolId: null
    };
  }
});
