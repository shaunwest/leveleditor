/**
 * Created by shaunwest on 11/17/15.
 */

import React, { Component } from 'react';
import frame from '../lib/frame.js';
import { point, rect } from '../lib/geom.js';
import { Selector, ResizableSelector, MoveableSelector, getResizeSide, RESIZE_NONE } from '../lib/selector.js';
import { Pointer } from '../lib/pointer.js';
import { drawRect } from '../lib/draw.js';
import getElementLocation from '../lib/getElementLocation.js'; //rename
import * as TOOLS from '../../constants/tools.js';

const CONTINUE = true,
  POINTER_COLOR = 'rgb(255, 0, 0)',
  POINTER_WIDTH = 16,
  POINTER_HEIGHT = 16,
  SELECTED_COLOR = 'rgb(0, 0, 255)',
  SELECTED_FILL_COLOR = 'rgba(0, 0, 255, 0.05)',
  POINTER_TOOLS = [TOOLS.SELECTOR, TOOLS.TILE_BRUSH, TOOLS.ERASER],
  SELECTION_AWARE_TOOLS = [TOOLS.TILE_BRUSH, TOOLS.FILL, TOOLS.ERASER];

const getSelector = Selector();
const getResizableSelector = ResizableSelector();
const getMoveableSelector = MoveableSelector();
const getPointer = Pointer(POINTER_WIDTH, POINTER_HEIGHT);

export default class InputLayer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      mouseIsActive: false,
      mouseIsDown: null,
      resizeSide: RESIZE_NONE,
      pointer: null,
      selector: null
    };
  }

  componentDidMount() {
    const getRenderFrame = frame(),
      context = this.refs.canvas.getContext('2d');

    getRenderFrame((elapsed, fps) => {
      context.clearRect(0, 0, this.props.width, this.props.height);

      if (this.state.pointer && this.state.mouseIsActive && POINTER_TOOLS.findIndex(toolName => toolName === this.props.selectedToolId) !== -1) {
        drawRect(context, this.state.pointer, POINTER_COLOR);
      }

      if (this.state.selector) {
        drawRect(context, this.state.selector, SELECTED_COLOR, SELECTED_FILL_COLOR);
      }      

      return CONTINUE;
    });
  }

  mouseDown(event) {
    const mouseLocation = getMouseLocation(event.clientX, event.clientY, this.refs.canvas);
    const killSelector = (this.state.selector &&
      !getResizeSide(mouseLocation, this.state.selector) && 
      this.props.selectedToolId === TOOLS.SELECTOR);

    this.setState({
      mouseIsDown: mouseLocation,
      resizeSide: RESIZE_NONE,
      selector: (killSelector) ?
        null : this.state.selector
    });

    if (this.state.mouseIsActive) {
      this.props.onMouseDown(point(mouseLocation.x, mouseLocation.y), this.state.selector);
    }
  }

  mouseUp(event) {
    const mouseLocation = getMouseLocation(event.clientX, event.clientY, this.refs.canvas);

    this.setState({ 
      mouseIsDown: null,
      resizeSide: RESIZE_NONE
    });

    this.props.onMouseUp(point(mouseLocation.x, mouseLocation.y));
  }

  mouseOut(event) {
    this.setState({ 
      mouseIsActive: false,
      mouseIsDown: null,
      resizeSide: RESIZE_NONE
    });
  }

  mouseMove(event) {
    const mouseLocation = getMouseLocation(event.clientX, event.clientY, this.refs.canvas);

    const newState = (this.state.mouseIsDown) ?
      this.mouseOverAndDown(mouseLocation) :
      this.mouseOver(mouseLocation);

    this.setState(newState);
    this.props.onMouseMove.bind(this)(mouseLocation, this.state.selector);
  }

  mouseOverAndDown(mouseLocation) {
    if (this.props.selectedToolId === TOOLS.SELECTOR) {
      return this.handleSelectorMove(mouseLocation);
    }
    else if (this.props.selectedToolId === TOOLS.GRABBER) {
      return this.handleGrabberMove(mouseLocation);
    }

    return this.state;
  }

  mouseOver(mouseLocation) {
    const newState = {
      mouseIsActive: true
    };

    if (this.props.selectedToolId === TOOLS.SELECTOR &&
      this.state.selector &&
      getResizeSide(mouseLocation, this.state.selector)) {
      // TODO: show resize mouse pointer
      newState.pointer = null;
    }
    else {
      // Show Pointer
      newState.pointer = getPointer(mouseLocation);
    }

    return newState;
  }

  // TODO: implement me!
  handleGrabberMove(mouseLocation) {
    const newState = {
      mouseIsActive: true
    };

    if (this.state.selector) {
      newState.selector = getMoveableSelector(this.state.mouseIsDown, mouseLocation, this.state.selector);
    }

    return newState;
  }

  handleSelectorMove(mouseLocation) {
    const newState = {
      mouseIsActive: true
    };

    if (this.state.resizeSide) {
      newState.selector = getResizableSelector(mouseLocation, this.state.selector, this.state.resizeSide);
      return newState;
    }

    if (this.state.selector) {
      newState.resizeSide = getResizeSide(mouseLocation, this.state.selector);
    }
   
    if (!newState.resizeSide)  {
      newState.selector = getSelector(mouseLocation, this.state.selector || this.state.pointer);
      newState.pointer = null;
    }

    return newState;
  }

  render() {
    const canvasClass = 'inputLayerCanvas' + (this.state.resizing ? ' resize' : '');

    return (
      <canvas 
        className={ canvasClass }
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

function getMouseLocation(clientX, clientY, canvas) {
  const canvasLocation = getElementLocation(canvas);
  return point(clientX - canvasLocation.x, clientY - canvasLocation.y);
}
