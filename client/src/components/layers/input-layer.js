/**
 * Created by shaunwest on 11/17/15.
 */

import React, { Component } from 'react';

import composeInputOverlay from '../overlays/input-overlay.js';

import { drawRect } from '../../lib/draw.js';

import CanvasRenderer from '../renderers/canvas-renderer.js';

import * as Tools from '../../constants/tools.js';

const POINTER_WIDTH = 16,
  POINTER_HEIGHT = 16,
  POINTER_COLOR = 'rgb(255, 0, 0)',
  SELECTED_COLOR = 'rgb(0, 0, 255)',
  SELECTED_FILL_COLOR = 'rgba(0, 0, 255, 0.05)',
  TEMP_SELECTOR_COLOR = 'rgb(0, 255, 0)',
  PointerTools = [Tools.SELECTOR, Tools.TILE_BRUSH, Tools.ERASER];

class InputLayer extends Component {
  componentDidMount() {
    this.renderContext = this.getRenderer().getContext('2d');
  }

  getRenderer() {
    return this.refs.renderer.getCanvas();
  }

  toolIsSelected(...toolIds) {
    return toolIds.find(toolId => this.props.selectedToolId === toolId);
  }

  render() {
    const props = this.props;
    const context = this.renderContext;
    const viewport = props.viewport;
    const canvasClass = 'inputLayerCanvas' + (props.resizing ? ' resize' : '');

    if (context) {
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

    return (
      <CanvasRenderer
        canvasClass={ canvasClass }
        width={ viewport.width }
        height={ viewport.height }
        ref="renderer"
      />
    );
  }
}

export default composeInputOverlay(InputLayer, POINTER_WIDTH, POINTER_HEIGHT); 
