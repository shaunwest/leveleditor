/**
 * Created by shaunwest on 1/18/16.
 */

import React, { Component } from 'react';

import { drawRect } from '../../lib/draw.js';
import * as Tools from '../../constants/tools.js';

const POINTER_COLOR = 'rgb(255, 0, 0)',
  SELECTED_COLOR = 'rgb(0, 0, 255)',
  SELECTED_FILL_COLOR = 'rgba(0, 0, 255, 0.05)',
  TEMP_SELECTOR_COLOR = 'rgb(0, 255, 0)',
  PointerTools = [Tools.SELECTOR, Tools.TILE_BRUSH, Tools.ERASER];

export default class InputRenderer extends Component {
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

  getCanvas() {
    return this.refs.canvas;
  }

  render() {
    const viewport = this.props.viewport;
    const pointer = this.props.pointer;
    const selector = this.props.selector;
    const tempSelector = this.props.tempSelector;
    const selectedToolId = this.props.selectedToolId;
    const context = this.state.renderContext;
    const isActive = this.props.isActive;
    const canvasClass = 'inputLayerCanvas' + (this.props.resizing ? ' resize' : '');

    if (context) {
      context.clearRect(0, 0, viewport.width, viewport.height);

      if (pointer && isActive && PointerTools.findIndex(toolName => toolName === selectedToolId) !== -1) {
        drawRect(context, pointer, POINTER_COLOR);
      }

      if (selector) {
        drawRect(context, selector, SELECTED_COLOR, SELECTED_FILL_COLOR);
      }

      if (tempSelector) {
        drawRect(context, tempSelector, TEMP_SELECTOR_COLOR);
      }      
    }

    return (
      <canvas 
        className={ canvasClass }
        width={ viewport.width }
        height={ viewport.height }
        ref="canvas">
      </canvas>
    );
  } 
}
