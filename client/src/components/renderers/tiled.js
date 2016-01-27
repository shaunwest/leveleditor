/**
 * Created by shaunwest on 1/17/16.
 */

import React, { Component } from 'react';
import { fixed } from '../../lib/render-types.js';
import { getCurrentFrames } from '../../lib/sprite-sequencer.js';

export default class TileRenderer extends Component {
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
    const renderContext = this.state.renderContext;
    const renderLoop = this.props.renderLoop;
    const spritesArray = this.props.spritesArray;
    const tileSize = this.props.tileSize;
    const regionWidth = this.props.regionWidth;
    const spriteSequences = this.props.spriteSequences;
    const viewport = this.props.viewport;

    // TODO: fix this unique name
    renderLoop('UNIQUENAME_FIXME', (fps, elapsed, vFrameCount, aFrameCount) => {
      const currentTiles = getCurrentFrames(spriteSequences, vFrameCount);

      renderContext.clearRect(0, 0, viewport.width, viewport.height);

      fixed(spritesArray, currentTiles, tileSize, regionWidth, function (spriteImage, x, y) {
        renderContext.drawImage(spriteImage, x, y);
      });
    });

    return (
      <canvas 
        className="layerCanvas"
        width={ viewport.width }
        height={ viewport.height }
        ref="canvas">
      </canvas>
    );
  } 
}
