/**
 * Created by shaunwest on 11/17/15.
 */

import React, { Component } from 'react';
import Inputer from '../../lib/inputer.js';

import { drawRect } from '../../lib/draw.js';
import { point, pointFromRect, rect, rectHasMinSize, dist, isMinDist } from '../../lib/util/geom.js';
import { expandableSelector, resizableSelector, moveableSelector,
  getResizeSide, RESIZE_NONE } from '../../lib/ui/selector.js';
import { Pointer } from '../../lib/ui/pointer.js';
import { clone } from '../../lib/obj.js';
import { snap } from '../../lib/ui/snap.js';
import getElementLocation from '../../lib/get-element-location.js';

import CanvasRenderer from '../renderers/canvas-renderer.js';

import * as Tools from '../../constants/tools.js';

const POINTER_WIDTH = 16,
  POINTER_HEIGHT = 16,
  POINTER_COLOR = 'rgb(255, 0, 0)',
  SELECTED_COLOR = 'rgb(0, 0, 255)',
  SELECTED_FILL_COLOR = 'rgba(0, 0, 255, 0.05)',
  TEMP_SELECTOR_COLOR = 'rgb(0, 255, 0)',
  PointerTools = [Tools.SELECTOR, Tools.TILE_BRUSH, Tools.ERASER];

const getPointer = Pointer(POINTER_WIDTH, POINTER_HEIGHT);

function getMouseLocation(clientX, clientY, element) {
  const elementLocation = getElementLocation(element);
  return point(clientX - elementLocation.x, clientY - elementLocation.y);
}

export default class InputLayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resizeSide: RESIZE_NONE,
      pointer: null,
      selector: null,
      ghostSelector: null,
      allowResize: false
    };
  }

  componentDidMount() {
    const canvas = this.refs.renderer.getCanvas();

    this.renderContext = canvas.getContext('2d');

    Inputer(
      canvas,
      (input) => {
        if (!input.isActive) {
          this.onOut(input);
        }
        else if (input.isPressed) {
          this.onPressed(input);
        }
        else {
          this.onReleased(input);
        }
      },
      getMouseLocation
    );
  }

  fireAction(position, lastPosition) {
    if (this.state.selector) {
      this.props.onSelectorAction(position, lastPosition, this.state.selector);
    }
    else {
      this.props.onPointerAction(position, lastPosition);
    }
  }

  onOut(input) {
    const selector = (!input.isPressed && this.state.selector) ||
      (this.state.selector && expandableSelector(input.position, input.initialPressPosition)) ||
      null;
      
    this.setState({ 
      pointer: null,
      selector,
      resizeSide: RESIZE_NONE
    });
  }

  onPressed(input) {
    if (this.toolIsSelected(Tools.TILE_BRUSH, Tools.ERASER)) {
      this.pointerDrag(input.position);
    }
    else if (this.toolIsSelected(Tools.SELECTOR)) {
      this.selectorDrag(input.position, input.initialPressPosition);
    }
    else if (this.toolIsSelected(Tools.GRABBER)) {
      this.grabberDrag(input.position, input.initialPressPosition);
    }
    else if (this.toolIsSelected(Tools.FILL, Tools.FILL_EMPTY, Tools.FILL_CONTIGUOUS, Tools.FILL_CONTIGUOUS_EMPTY)) {
      this.fireAction(input.position, this.state.pointer);
    }
  }

  pointerDrag(position) {
    const lastPointer = this.state.pointer;
    const pointer = getPointer(position);
    
    this.setState({
      pointer
    });
   
    this.fireAction(pointer, lastPointer || clone(pointer));
  }

  selectorDrag(position, initialPressPosition) {
    const previousState = this.state;

    if (previousState.resizeSide) {
      this.setState({ 
        selector: resizableSelector(position, previousState.selector, previousState.resizeSide) 
      });
    }
    else {
      const resizeSide = getResizeSide(position, previousState.selector);

      if (previousState.allowResize && resizeSide) {
        this.setState({
          resizeSide
        });
      }
      else {
        this.selectorDragExpand(position, initialPressPosition);
      }
    }
  }

  selectorDragExpand(position, initialPressPosition) {
    const selectorDistance = dist(position, initialPressPosition);
    const newSelector = isMinDist(selectorDistance, POINTER_WIDTH, POINTER_HEIGHT) ? 
      expandableSelector(position, initialPressPosition) : null;

    this.setState({
      selector: newSelector,
      pointer: null
    });
  }

  selectorReleasedResize() {
    this.setState({
      pointer: null,
      allowResize: true
    });
  }

  grabberDrag(position, initialPosition) {
    const previousState = this.state;

    if (previousState.selector) {
      const ghostSelector = previousState.ghostSelector || clone(previousState.selector);
      const grabberDiff = point(initialPosition.x - ghostSelector.x, initialPosition.y - ghostSelector.y);

      this.setState({
        selector: moveableSelector(position, previousState.selector, grabberDiff),
        ghostSelector
      });
    }
    else {
      const viewport = previousState.lastViewport || this.props.viewport;
      const grabberDiff = point(position.x - initialPosition.x, position.y - initialPosition.y);
      const newViewport = {
        x: snap(viewport.x - grabberDiff.x),
        y: snap(viewport.y - grabberDiff.y)
      };
      this.setState({
        lastViewport: viewport
      });
      this.props.onPointerAction(newViewport);
    }
  }

  grabberReleased(pointer) {
    this.setState({ 
      pointer,
      resizeSide: RESIZE_NONE,
      ghostSelector: null,
      lastViewport: null
    });
  }
 
  defaultReleased(pointer, allowResize) {
    this.setState({ 
      pointer,
      resizeSide: RESIZE_NONE,
      ghostSelector: null,
      allowResize
    });
  }

  onReleased(input) {
    const previousState = this.state;

    if (this.toolIsSelected(Tools.SELECTOR) &&
        previousState.selector &&
        getResizeSide(input.position, previousState.selector)) {
      this.selectorReleasedResize();
    }
    else if (this.toolIsSelected(Tools.GRABBER)) {
      const lastPosition = this.state.pointer;

      this.grabberReleased(getPointer(input.position));

      if (previousState.ghostSelector) {
        this.props.onSelectorAction(getPointer(previousState.ghostSelector), lastPosition, previousState.selector);
      }
    }
    else {
      this.defaultReleased(getPointer(input.position), !!previousState.selector);
    }
  }

  toolIsSelected(...toolIds) {
    return toolIds.find(toolId => this.props.selectedToolId === toolId);
  }

  render() {
    const state = this.state;
    const context = this.renderContext;
    const viewport = this.props.viewport;
    const canvasClass = 'inputLayerCanvas' + (this.props.resizing ? ' resize' : '');

    if (context) {
      const selectedToolId = this.props.selectedToolId;

      context.clearRect(0, 0, viewport.width, viewport.height);

      if (state.pointer && this.toolIsSelected(...PointerTools)) {
        drawRect(context, state.pointer, POINTER_COLOR);
      }

      if (state.selector) {
        drawRect(context, state.selector, SELECTED_COLOR, SELECTED_FILL_COLOR);
      }

      if (state.ghostSelector) {
        drawRect(context, state.ghostSelector, TEMP_SELECTOR_COLOR);
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
