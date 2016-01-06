/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';
//import RenderPerf from '../debug/render-perf.js';
//import fixedRenderer from '../../lib/fixed-renderer.js';
import { getCurrentFrames } from '../../lib/sprite-sequencer.js';
import { fixed } from '../../lib/render-types.js';

const TILE_SIZE = 16,
  MAX_TILE_FRAMES = 16;

function Canvaser(context) {
  return {
    drawSprite(spriteImage, x, y) {
      context.drawImage(spriteImage, x, y);
    },

    clearSprites(width, height) {
      context.clearRect(0, 0, width, height);
    }
  };
}

export default class Layer extends Component {
  render() {
    const layer = this.props.layer;
    const tileImages = this.props.tileImages;
    const renderLoop = this.props.renderLoop;
    const viewport = this.props.viewport;
    const tileSize = layer.get('tileSize');
    const renderMode = layer.get('renderMode');
    const sprites = layer.get('sprites');
    const regionWidth = layer.get('width');

    if (tileImages.size && sprites.size) {
      const spriteSequences = tileImages.toJS();
      const spritesArray = sprites.toArray();

      renderLoop((fps, elapsed, vFrameCount, aFrameCount) => {
        if (!this.canvaser) {
          if (this.refs.canvas) {
            this.canvaser = Canvaser(this.refs.canvas.getContext('2d'));
          }   
          return;
        }

        this.canvaser.clearSprites(viewport.width, viewport.height);

        const currentTiles = getCurrentFrames(spriteSequences, vFrameCount);
        // use renderMode to pick the correct render func
        fixed(spritesArray, currentTiles, tileSize, regionWidth, this.canvaser.drawSprite);
      });
    }

    return (
      <div
        className="layerContainer"
        style={{ display: layer.get('visible') ? 'block' : 'none' }}>
        <canvas 
          className="layerCanvas"
          width={ layer.get('width') }
          height={ layer.get('height') }
          ref="canvas">
        </canvas>
      </div>
    );
  }
}
