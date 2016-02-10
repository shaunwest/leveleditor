/**
 * Created by shaunwest on 11/17/15.
 */

import React, { Component } from 'react';

import composeInputOverlay from '../overlays/input-overlay.js';

import { drawRect } from '../../lib/draw.js';

import Canvas from '../renderers/canvas.js';

import * as Tools from '../../constants/tools.js';

const POINTER_WIDTH = 16,
  POINTER_HEIGHT = 16,
  POINTER_COLOR = 'rgb(255, 0, 0)',
  SELECTED_COLOR = 'rgb(0, 0, 255)',
  SELECTED_FILL_COLOR = 'rgba(0, 0, 255, 0.05)',
  TEMP_SELECTOR_COLOR = 'rgb(0, 255, 0)',
  PointerTools = [Tools.SELECTOR, Tools.TILE_BRUSH, Tools.ERASER];

class InputLayer extends Component {
  toolIsSelected(...toolIds) {
    return toolIds.find(toolId => this.props.selectedToolId === toolId);
  }

  draw(canvas, width, height) {
    if (!canvas) {
      return;
    }

    const props = this.props;
    const viewport = props.viewport;
    const context = canvas.getContext('2d');
    const selectedToolId = props.selectedToolId;

    context.clearRect(0, 0, viewport.width, viewport.height);

    if (props.pointer && this.toolIsSelected(...PointerTools)) {
      drawRect(context, props.pointer, POINTER_COLOR);
    }

    if (props.selector) {
      drawRect(context, props.selector, SELECTED_COLOR, SELECTED_FILL_COLOR);
    }

    if (props.ghostSelector) {
      drawRect(context, props.ghostSelector, TEMP_SELECTOR_COLOR);
    }
  }
  
  render() {
    const viewport = this.props.viewport;
    const canvasClass = 'inputLayerCanvas' + (this.props.resizing ? ' resize' : '');

    return (
      <Canvas
        canvasClass={ canvasClass }
        width={ viewport.width }
        height={ viewport.height }
        draw={ this.draw.bind(this) }
        ref="renderer"
      />
    );
  }
}

export default composeInputOverlay(InputLayer, POINTER_WIDTH, POINTER_HEIGHT); 
