/**
 * Created by shaunwest on 11/17/15.
 */

import React, { Component } from 'react';
import frame from '../lib/frame.js';
import point from '../lib/point.js';
import rect from '../lib/rect.js';
import getElementLocation from '../lib/getElementLocation.js';
import * as TOOLS from '../../constants/tools.js';

const CONTINUE = true,
  SELECTOR_COLOR = 'rgb(255, 0, 0)',
  SELECTOR_MIN_WIDTH = 16,
  SELECTOR_MIN_HEIGHT = 16,
  SELECTED_COLOR = 'rgb(0, 0, 255)',
  SELECTED_FILL_COLOR = 'rgba(0, 0, 255, 0.05)',
  SELECTOR_TOOLS = [TOOLS.SELECTOR, TOOLS.TILE_BRUSH, TOOLS.ERASER],
  SELECTION_AWARE_TOOLS = [TOOLS.TILE_BRUSH, TOOLS.FILL, TOOLS.ERASER]; 

export default class InputLayer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      mouseIsActive: false,
      mouseIsDown: false,
      selector: null,
      selection: null
    };
  }

  componentDidMount() {
    const getRenderFrame = frame(),
      context = this.refs.canvas.getContext('2d');

    getRenderFrame((elapsed, fps) => {
      context.clearRect(0, 0, this.props.width, this.props.height);

      if (this.state.selector && this.state.mouseIsActive && SELECTOR_TOOLS.findIndex(toolName => toolName === this.props.selectedToolId) !== -1) {
        drawRect(context, this.state.selector, SELECTOR_COLOR);
      }

      if (this.state.selection) {
        drawRect(context, this.state.selection, SELECTED_COLOR, SELECTED_FILL_COLOR);
      }      

      return CONTINUE;
    });
  }

  mouseDown(event) {
    const mouseLocation = getMouseLocation(event.clientX, event.clientY, this.refs.canvas);
    const selection = (this.props.selectedToolId === TOOLS.SELECTOR && this.state.selection) ?
      null : this.state.selection;

    this.setState({ mouseIsDown: true, selection });

    if (this.state.mouseIsActive) {
      this.props.onMouseDown(point(mouseLocation.x, mouseLocation.y), selection);
    }
  }

  mouseUp(event) {
    const mouseLocation = getMouseLocation(event.clientX, event.clientY, this.refs.canvas);

    this.setState({ mouseIsDown: false });
    this.props.onMouseUp(point(mouseLocation.x, mouseLocation.y));
  }

  mouseOut(event) {
    this.setState({ 
      mouseIsActive: false,
      mouseIsDown: false
    });
  }

  mouseMove(event) {
    const mouseLocation = getMouseLocation(event.clientX, event.clientY, this.refs.canvas);
    const selection = (this.props.selectedToolId === TOOLS.SELECTOR && this.state.selection) ?
      null : this.state.selection;
    const state = {
      mouseIsActive: true
    };

    if (this.props.selectedToolId === TOOLS.SELECTOR && this.state.mouseIsDown) {
      state.selection = selectorGrow(mouseLocation, this.state.selection || this.state.selector);
      state.selector = null;
    } 
    else {
      state.selector = selectorMove(mouseLocation);
    }

    this.setState(state);
    this.props.onMouseMove.bind(this)(point(mouseLocation.x, mouseLocation.y), selection);
  }

  render() {
    return (
      <canvas 
        className="inputLayerCanvas"
        onMouseDown={ this.mouseDown.bind(this) }
        onMouseMove={ this.mouseMove.bind(this) }
        onMouseUp={ this.mouseUp.bind(this) }
        onMouseOut={ this.mouseOut.bind(this) }
        width={ this.props.width }
        height={ this.props.height }
        ref="canvas">
      </canvas>
    );
  }
}

function drawRect(context, rect, strokeStyle, fillStyle) {
  context.beginPath();
  if (strokeStyle) {
    context.strokeStyle = strokeStyle;
  }

  if (fillStyle) {
    context.fillStyle = fillStyle;
    context.fillRect(rect.x, rect.y, rect.width, rect.height);
  }

  context.rect(rect.x, rect.y, rect.width, rect.height);
  context.stroke();
  context.closePath();
}

function getMouseLocation(clientX, clientY, canvas) {
  const canvasLocation = getElementLocation(canvas);
  return point(clientX - canvasLocation.x, clientY - canvasLocation.y);
}

function snap(value) {
  return Math.floor(value / 16) * 16;
}

function selectorMove(mouseLocation) {
  return rect(snap(mouseLocation.x), snap(mouseLocation.y), SELECTOR_MIN_WIDTH, SELECTOR_MIN_HEIGHT);
}

function selectorGrow(mouseLocation, selector) {
  return rect(selector.x, selector.y, snap(mouseLocation.x - selector.x), snap(mouseLocation.y - selector.y));
}
