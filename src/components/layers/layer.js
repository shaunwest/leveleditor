/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';
//import RenderPerf from '../debug/render-perf.js';
//import fixedRenderer from '../../lib/fixed-renderer.js';
import { getCurrentFrames } from '../../lib/sprite-sequencer.js';
import { fixed } from '../../lib/render-types.js';

const TILE_SIZE = 16,
  MAX_TILE_FRAMES = 16,
  NOOP = function () {};

export default class Layer extends Component {
  constructor(props) {
    super(props);

    //this.renderLoop = NOOP;
  }

  /*
  componentDidUpdate() {
    const layer = this.props.layer;
    const tileImages = this.props.tileImages;

    if (this.renderLoop === NOOP && tileImages.size) {
      this.renderLoop = fixedRenderer(
        this.refs.canvas.getContext('2d'),
        layer.get('tiles').toArray(),
        TILE_SIZE,
        tileImages.toJS(),
        layer.get('width'),
        layer.get('height')
      );
    }
  }
  */


  render() {
    const layer = this.props.layer;
    const canvas = this.refs.canvas;
    const tileImages = this.props.tileImages;
    const renderLoop = this.props.renderLoop;
    const viewport = this.props.viewport;
    const tileSize = layer.get('tileSize');
    const renderMode = layer.get('renderMode');

    if (canvas && tileImages.size) {
      const context = canvas.getContext('2d');
      const spriteSequences = tileImages.toJS();
      const sprites = layer.get('sprites').toArray();
      const regionWidth = layer.get('width');
      /*fixedRenderer(
        canvas.getContext('2d'),
        layer.get('sprites').toArray(),
        tileSize,
        tileImages.toJS(),
        layer.get('width'),
        layer.get('height')
      );*/
      /*
      fixedRenderer(
        canvas.getContext('2d'),
        layer.get('sprites').toArray(),
        tileSize,
        tileImages.toJS(),
        layer.get('width'),
        viewport
      );
      */

      console.log('asdfa');
      const _CANVAS_METHODS = {
        drawSprite(spriteImage, x, y) {
          context.drawImage(spriteImage, x, y);
        },

        clearSprites(width, height) {
          context.clearRect(0, 0, width, height);
        }
      };

      renderLoop((fps, elapsed, vFrameCount, aFrameCount) => {
        const currentTiles = getCurrentFrames(spriteSequences, vFrameCount);

        _CANVAS_METHODS.clearSprites(viewport.width, viewport.height);

        fixed(sprites, currentTiles, tileSize, regionWidth, _CANVAS_METHODS.drawSprite);
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
