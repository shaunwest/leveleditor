import React, { Component } from 'react';

const DEFAULT_HEIGHT = 16;
const DEFAULT_WIDTH = 16;

export default class Canvas extends Component {
  render() {
    const width = this.props.width || DEFAULT_WIDTH;
    const height = this.props.height || DEFAULT_HEIGHT;
    const scale = parseInt(this.props.scale) || 1;
    const sWidth = width * scale;
    const sHeight = height * scale;

    return (
      <canvas 
        className={ this.props.canvasClass }
        width={ sWidth }
        height={ sHeight }
        ref={ (c) => this.props.draw(c, sWidth, sHeight) }
      />
    );
  }
}
