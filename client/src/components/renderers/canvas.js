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
        width={ sWidth }
        height={ sHeight }
        ref={ (c) => drawToCanvas(c, this.props.image, sWidth, sHeight) }
      />
    );
  }
}

function drawToCanvas(canvas, image, width, height) {
  if (!canvas) {
    return;
  }

  const context = canvas.getContext('2d');
  context.imageSmoothingEnabled = false;
  context.drawImage(image, 0, 0, width, height);
}
