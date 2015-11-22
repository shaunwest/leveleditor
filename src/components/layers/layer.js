/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';
import frame from '../lib/frame.js';

const TILE_SIZE = 16,
  MAX_TILE_FRAMES = 16,
  CONTINUE = true,
  DISPLAY_SHOW = 'block',
  DISPLAY_HIDE = 'none';

export default class Layer extends Component {
  componentDidMount() {
    const getRenderFrame = frame(),
      getInputFrame = frame(),
      canvas = this.refs.canvas,
      context = canvas.getContext('2d');

    let frameCount = 0;

    getRenderFrame((elapsed, fps) => {
      const tileImages = this.props.tileImages.toJS(),
        layer = this.props.layer,
        width = layer.get('width'),
        height = layer.get('height'),
        tiles = layer.get('tiles').toArray();

      context.clearRect(0, 0, width, height);
      drawTiles(context, tiles, tileImages, width, (frameCount === MAX_TILE_FRAMES) ? frameCount = 0 : frameCount++);

      return CONTINUE;
    });
  }

  render() {
    const layer = this.props.layer,
      width = layer.get('width'),
      height = layer.get('height');

    return (
      <canvas 
        className="layerCanvas"
        style={{ display: (this.props.layer.get('visible')) ? DISPLAY_SHOW : DISPLAY_HIDE }}
        width={ width }
        height={ height }
        ref="canvas">
      </canvas>
    );
  }
}

function drawTiles(context, tiles, tileImages, width, frameCount) {
  for(let i = 0; i < tiles.length; i++) {
    const tileIndex = tiles[i];

    if (typeof tileIndex === 'undefined') {
      continue;
    }

    const tileData = tileImages[tileIndex];
    if (!tileData || !tileData.length) {
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
