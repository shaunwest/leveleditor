/**
 * Created by shaunwest on 8/22/15.
 */

//import Ractive from 'ractive';
import React, { Component } from 'react';
import frame from './lib/frame.js';

const TILE_SIZE = 16,
  MAX_TILE_FRAMES = 16,
  CONTINUE = true;

export default class Layer extends Component {
  constructor(props) {
    super(props);

    this.state = { mouseIsDown: false };
  }

  componentDidMount() {
    const getRenderFrame = frame(),
      getInputFrame = frame(),
      canvas = this.refs.canvas,
      context = canvas.getContext('2d');

    let frameCount = 0;

    getRenderFrame((elapsed, fps) => {
      const tileImages = this.props.tileImages,
        layer = this.props.layer,
        width = this.props.width,
        height = this.props.height,
        tiles = layer.get('tiles');

      clearLayer(context, width, height);
      drawTiles(context, tiles, tileImages, width, (frameCount === MAX_TILE_FRAMES) ? frameCount = 0 : frameCount++);
      
      //context.rect(0, 0, 100, 100);
      //context.stroke();

      return CONTINUE;
    });
  }

  mouseDown(event) {
    const canvasLocation = getElementLocation(this.refs.canvas);
    this.setState({ mouseIsDown: true });
    this.triggerToolAction(event.clientX - canvasLocation.x, event.clientY - canvasLocation.y);
  }

  mouseUp(event) {
    this.setState({ mouseIsDown: false });
  }

  mouseMove(event) {
    if (this.state.mouseIsDown) {
      const canvasLocation = getElementLocation(this.refs.canvas);
      this.triggerToolAction(event.clientX - canvasLocation.x, event.clientY - canvasLocation.y);
    }
  }

  triggerToolAction(x, y) {
    switch (this.props.toolId) {
      case 'eraser':
        this.props.onToolAction('removeTile', x, y);
        return;
      case 'fill':
        this.props.onToolAction('fillTiles', x, y);
        return;
      default:
        this.props.onToolAction('addTile', x, y);
    }
  }

  /*
  // prevent React from updating after the initial render
  // Could be useful here since this has it's own render function
  shouldComponentUpdate() {
    return false;
  }
  */
 
  render() {
    return (
      <canvas className="layer" onMouseDown={ this.mouseDown.bind(this) } onMouseMove={ this.mouseMove.bind(this) } onMouseUp={ this.mouseUp.bind(this) } width="400" height="400" ref="canvas"></canvas>
    );
  }
}

function getElementLocation(element) {
  const bounds = element.getBoundingClientRect();
  return {
    x: Math.floor(bounds.left),
    y: Math.floor(bounds.top)
  };
}

function clearLayer(context, width, height) {
  context.clearRect(0, 0, width, height);
}

function drawTiles(context, tiles, tileImages, width, frameCount) {
  for(let i = 0; i < tiles.size; i++) {
    const tileIndex = tiles.get(i);

    if (typeof tileIndex === 'undefined') {
      continue;
    }

    const tileData = tileImages.get(tileIndex);
    if (!tileData || !tileData.size) {
      continue;
    }

    const numImages = tileData.size,
      tileDataIndex = frameCount % numImages,
      tileImage = tileData.get(tileDataIndex),
      widthInTiles = Math.floor(width / TILE_SIZE),
      x = i % widthInTiles,
      y = Math.floor(i / widthInTiles);

    context.drawImage(tileImage, x * TILE_SIZE, y * TILE_SIZE);
  }
}


/*
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

    getRenderFrame((elapsed, fps) => {
      const tileImages = this.get('tileImages'),
        layer = this.get('layer'),
        width = this.get('width'),
        height = this.get('height'),
        tiles = layer.tiles;

      clearLayer(context, width, height);
      drawTiles(context, tiles, tileImages, width, (frameCount === MAX_TILE_FRAMES) ? frameCount = 0 : frameCount++);
      
      //context.rect(0, 0, 100, 100);
      //context.stroke();

      return CONTINUE;
    });

    getInputFrame((elapsed, fps) => {
      //this.set('fps', fps);

      if (isMouseDown) {
        switch(this.get('toolId')) {
          case 'eraser':
            this.fire('removeTile', mouseLocation);
            break;
          case 'fill':
            this.fire('fillTiles', mouseLocation);
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
      visible: true,
      fps: 0,
      tileImages: [],
      width: 400,
      height: 400,
      toolId: null
    };
  }
});*/
