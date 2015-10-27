
import React, { Component } from 'react';

export default class Canvas extends Component {
  componentDidMount() {
    drawToCanvas(this.refs.canvas, this.props.image);
  }

  componentWillReceiveProps(nextProps) {
    drawToCanvas(this.refs.canvas, nextProps.image);
  }

  render() {
    return (
      <canvas width="16" height="16" ref="canvas" />
    );
  }
}

function drawToCanvas(canvas, image) {
  canvas
    .getContext('2d')
    .drawImage(image, 0, 0);
}
