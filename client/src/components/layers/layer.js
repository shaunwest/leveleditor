/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';
//import RenderPerf from '../debug/render-perf.js';
//import fixedRenderer from '../../lib/fixed-renderer.js';
import { getCurrentFrames } from '../../lib/sprite-sequencer.js';
import { fixed } from '../../lib/render-types.js';

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
    //const sprites = layer.get('sprites');
    const sprites = this.props.layout;
    const renderContext = this.state.renderContext;

    if (tileImages.size && sprites && sprites.size && renderContext) {
      const spriteSequences = tileImages.toJS();
      const spritesArray = sprites.toArray();
      const renderLoop = this.props.renderLoop;
      const regionWidth = layer.get('width');
      const renderMode = layer.get('renderMode');
      const viewport = this.props.viewport;
      const tileSize = layer.get('tileSize');

      renderLoop('FOOO', (fps, elapsed, vFrameCount, aFrameCount) => {
        const currentTiles = getCurrentFrames(spriteSequences, vFrameCount);

        renderContext.clearRect(0, 0, viewport.width, viewport.height);

        if (renderMode === 'fixed') {
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
