/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';
import RenderPerf from '../debug/render-perf.js';
import tileRenderer from '../../lib/tile-renderer.js';

const TILE_SIZE = 16,
  MAX_TILE_FRAMES = 16,
  DISPLAY_SHOW = 'block',
  DISPLAY_HIDE = 'none',
  NOOP = function () {};

export default class Layer extends Component {
  render() {
    const layer = this.props.layer;
    const layerCanvas = this.refs.canvas;
    const tiles = layer.get('tiles');
    const width = layer.get('width');
    const height = layer.get('height');
    const tileImages = this.props.tileImages;
    const _RENDER_LOOP = (tileImages.size && layerCanvas) ? 
      tileRenderer(
        layerCanvas.getContext('2d'),
        tiles.toArray(),
        TILE_SIZE,
        tileImages.toJS(),
        width,
        height) :
      NOOP;

    return (
      <div
        className="layerContainer"
        style={{ display: this.props.layer.get('visible') ? 'block' : 'none' }}>
        <canvas 
          className="layerCanvas"
          width={ width }
          height={ height }
          ref="canvas">
        </canvas>
      </div>
    );
  }
}
