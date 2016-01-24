/**
 * Created by shaunwest on 11/17/15.
 */

import React, { Component } from 'react';
import Inputer from '../../lib/inputer.js';

import { drawRect } from '../../lib/draw.js';
import { point, pointFromRect, rect, rectHasMinSize, dist, isMinDist } from '../../lib/geom.js';
import { ExpandableSelector, ResizableSelector, MoveableSelector,
  getResizeSide, RESIZE_NONE } from '../../lib/selector.js';
import { Pointer } from '../../lib/pointer.js';
import { clone } from '../../lib/obj.js';

import CanvasRenderer from '../renderers/canvas.js';

import * as Tools from '../../constants/tools.js';

const POINTER_WIDTH = 16,
  POINTER_HEIGHT = 16,
  POINTER_COLOR = 'rgb(255, 0, 0)',
  SELECTED_COLOR = 'rgb(0, 0, 255)',
  SELECTED_FILL_COLOR = 'rgba(0, 0, 255, 0.05)',
  TEMP_SELECTOR_COLOR = 'rgb(0, 255, 0)',
  PointerTools = [Tools.SELECTOR, Tools.TILE_BRUSH, Tools.ERASER];

const getExpandableSelector = ExpandableSelector();
const getResizableSelector = ResizableSelector();
const getMoveableSelector = MoveableSelector();
const getPointer = Pointer(POINTER_WIDTH, POINTER_HEIGHT);

export default class InputLayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resizeSide: RESIZE_NONE,
      grabberDiff: null,
      pointer: null,
      selector: null,
      tempSelector: null,
      resetSelector: true
    };
  }

  componentDidMount() {
    const props = this.props,
      canvas = this.refs.renderer.getCanvas();

    this.renderContext = canvas.getContext('2d');

    const inputer = new Inputer(canvas);

    inputer.onUpdate((input) => {
      if (input.isPressed) {
        this.onPressed(input);
      }
      else {
        this.onReleased(input);
      }
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
      this.grabberDrag(input.position);
    }
  }

  pointerDrag(position) {
    this.setState({
      pointer: getPointer(position)
    });
    this.props.onPointerAction(this.state.pointer);
  }

  selectorDrag(position, initialPressPosition) {
    const previousState = this.state;

    if (previousState.resizeSide) {
      this.setState({ 
        selector: getResizableSelector(position, previousState.selector, previousState.resizeSide) 
      });
    }
    else {
      const resizeSide = (previousState.selector) ?
        getResizeSide(position, previousState.selector) :
        null;

      if (resizeSide) {
        /*
         * removed temporarily
        this.setState({
          resizeSide
        });
        */
      }
      else {
        this.makeExpandableSelector(position, initialPressPosition);
      }
    }

    this.props.onSelectorAction(position, this.state.selector);
  }

  /*
  makeExpandableSelector(position, initialPressPosition, selector, resetSelector) {
    const oldPointerPosition = (resetSelector || !selector) ?
      initialPressPosition : pointFromRect(selector);

    const selectorDistance = dist(position, oldPointerPosition);
    const newSelector = isMinDist(selectorDistance, 16, 16) ? 
      getExpandableSelector(position, oldPointerPosition) : null;

    this.setState({
      selector: newSelector,
      pointer: null,
      resetSelector: false
    });
  }
  */

  makeExpandableSelector(position, initialPressPosition) {
    const selectorDistance = dist(position, initialPressPosition);
    const newSelector = isMinDist(selectorDistance, POINTER_WIDTH, POINTER_HEIGHT) ? 
      getExpandableSelector(position, initialPressPosition) : null;

    this.setState({
      selector: newSelector,
      pointer: null
    });
  }

  grabberDrag(position) {
    const previousState = this.state;

    if (previousState.selector) {
      this.setState({
        selector: getMoveableSelector(position, previousState.selector, previousState.grabberDiff),
        tempSelector: previousState.tempSelector || clone(previousState.selector)
      });
    }
  }

  /*
  onPressed(input) {
    if (this.toolIsSelected(Tools.SELECTOR)) {
      this.selectorPress(input.position);
    } 
    else if (this.toolIsSelected(Tools.GRABBER)) {
      this.grabberPress(input.position);
    }
    else {
      const pointer = getPointer(input.position);
      this.setState({ pointer });
      this.props.onPointerAction(pointer);
    }
  }
  */

  selectorPress(position) {
    const previousState = this.state;

    if (previousState.selector && !getResizeSide(this.state.pointer, previousState.selector)) {
      this.setState({
        pointer: getPointer(position),
        selector: null
      });
      this.props.onSelectorAction(this.state.pointer, previousState.selector);
    }
    else {
      this.setState({
        pointer: getPointer(position),
      });
      this.props.onPointerAction(this.state.pointer);
    } 
  }

  grabberPress(position) {
    const previousState = this.state;

    this.setState({
      grabberDiff: point(position.x - previousState.selector.x, position.y - previoiusState.selector.y)
    });
  }

  onReleased(input) {
    const previousState = this.state;

    // hide pointer when resizing
    if (this.toolIsSelected(Tools.SELECTOR) && previousState.selector && getResizeSide(input.position, previousState.selector)) { 
      this.setState({
        pointer: null
      });
    } 
    else {
      const pointer = (this.state.grabberDiff) ?
        getPointer(
          input.activePressPosition.x - previousState.grabberDiff.x,
          input.activePressPosition.y - previousState.grabberDiff.y
        ) :
        getPointer(input.lastPosition);

      this.setState({ 
        pointer,
        resizeSide: RESIZE_NONE,
        tempSelector: null,
        grabberDiff: null,
        resetSelector: true
      });

      if (previousState.grabberDiff) {
        if (previousState.selector) {
          this.props.onSelectorAction(this.state.pointer, previousState.selector);
        }
        else {
          this.props.onPointerAction(this.state.pointer);
        }
      }
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
    const selectedToolId = this.props.selectedToolId;
    const isActive = true;
    //if (!state.isActive) {
      // fooo
    //}

    if (context) {
      context.clearRect(0, 0, viewport.width, viewport.height);

      if (state.pointer && isActive && PointerTools.findIndex(toolName => toolName === selectedToolId) !== -1) {
        drawRect(context, state.pointer, POINTER_COLOR);
      }

      if (state.selector) {
        drawRect(context, state.selector, SELECTED_COLOR, SELECTED_FILL_COLOR);
      }

      if (state.tempSelector) {
        drawRect(context, state.tempSelector, TEMP_SELECTOR_COLOR);
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
