/**
 * Created by shaunwest on 1/21/16.
 */

import React, { Component } from 'react';

export default class CanvasRenderer extends Component {
  getCanvas() {
    return this.refs.canvas;
  }

  render() {
    return (
      <canvas 
        className={ this.props.canvasClass }
        width={ this.props.width }
        height={ this.props.height }
        ref="canvas">
      </canvas>
    );
  } 
}
