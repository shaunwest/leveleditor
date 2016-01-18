/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';
//import RenderPerf from '../debug/render-perf.js';
//import fixedRenderer from '../../lib/fixed-renderer.js';
import { getCurrentFrames } from '../../lib/sprite-sequencer.js';
import { fixed } from '../../lib/render-types.js';
import * as layoutTypes from '../../constants/layout-types.js';

// TODO: maybe make Layer a smart component and make a new component
// that handles the renderLoop, etc
export default class Layer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderContext: null
    };
  }

  componentDidMount() {
    this.setState({
      renderContext: this.refs.canvas.getContext('2d')
    });
  }

  render() {
    const layer = this.props.layer;
    const tileImages = this.props.tileImages;
    const layout = layer.get('layout');
    const renderContext = this.state.renderContext;

    if (tileImages && tileImages.size && layout && layout.size && renderContext) {
      const spriteSequences = tileImages.toJS();
      const spritesArray = layout.toArray();
      const renderLoop = this.props.renderLoop;
      const regionWidth = layer.get('width');
      const layoutType = layer.get('layoutType');
      const viewport = this.props.viewport;
      const tileSize = layer.get('tileSize');

      renderLoop('FOOO', (fps, elapsed, vFrameCount, aFrameCount) => {
        const currentTiles = getCurrentFrames(spriteSequences, vFrameCount);

        renderContext.clearRect(0, 0, viewport.width, viewport.height);

        if (layoutType === layoutTypes.FIXED_2D) {
          fixed(spritesArray, currentTiles, tileSize, regionWidth, function (spriteImage, x, y) {
            renderContext.drawImage(spriteImage, x, y);
          });
        }
      });
    }

    return (
      <div
        className="layerContainer"
        style={{ display: this.props.visible ? 'block' : 'none' }}>
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
