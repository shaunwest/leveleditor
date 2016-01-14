/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';
import RenderPerf from '../debug/render-perf.js';

const TILE_SIZE = 16,
  MAX_TILE_FRAMES = 16,
  DISPLAY_SHOW = 'block',
  DISPLAY_HIDE = 'none',

export default class DebugLayer extends Component {
  render() {
    const layerCanvas = this.refs.canvas;
    const width = this.props.width;
    const height = this.props.height;

    return (
      <div
        className="layerContainer"
        style={{ display: this.props.visible ? 'block' : 'none' }}>
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
