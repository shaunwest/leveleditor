/**
 * Created by shaunwest on 11/17/15.
 */

import React, { Component } from 'react';
import Looper from '../../lib/looper.js';
import Inputer from '../../lib/inputer.js';
import { point, rect } from '../../lib/geom.js';
import { Selector, ResizableSelector, MoveableSelector, getResizeSide, RESIZE_NONE } from '../../lib/selector.js';
import { Pointer } from '../../lib/pointer.js';
import { drawRect } from '../../lib/draw.js';
import { clone } from '../../lib/obj.js';
import * as TOOLS from '../../constants/tools.js';

const CONTINUE = true,
  POINTER_COLOR = 'rgb(255, 0, 0)',
  POINTER_WIDTH = 16,
  POINTER_HEIGHT = 16,
  SELECTED_COLOR = 'rgb(0, 0, 255)',
  SELECTED_FILL_COLOR = 'rgba(0, 0, 255, 0.05)',
  TEMP_SELECTOR_COLOR = 'rgb(0, 255, 0)',
  ACTION_NONE = 'actionNone',
  ACTION_FIRE = 'actionFire',
  POINTER_TOOLS = [TOOLS.SELECTOR, TOOLS.TILE_BRUSH, TOOLS.ERASER];

const getSelector = Selector();
const getResizableSelector = ResizableSelector();
const getMoveableSelector = MoveableSelector();
const getPointer = Pointer(POINTER_WIDTH, POINTER_HEIGHT);

export default class InputLayer extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      action: ACTION_NONE,
      resizeSide: RESIZE_NONE,
      grabberDiff: null,
      pointer: null,
      selector: null,
      tempSelector: null
    };
  }

  componentDidMount() {
    const props = this.props,
      state = this.state,
      _RENDER_LOOP = Looper('inputLayer'),
      context = this.refs.canvas.getContext('2d');

    const inputer = new Inputer(this.refs.canvas);

    // PRESS
    inputer
      .onPress(position => {
        if (this.toolIsSelected(TOOLS.TILE_BRUSH, TOOLS.ERASER, TOOLS.FILL, TOOLS.FILL_EMPTY, TOOLS.FILL_CONTIGUOUS, TOOLS.FILL_CONTIGUOUS_EMPTY)) {
          return {
            action: ACTION_FIRE,
            pointer: position
          };
        }

        if (this.toolIsSelected(TOOLS.SELECTOR)) {
          return {
            action: ACTION_FIRE,
            pointer: getPointer(position),
            selector: (this.state.selector && !getResizeSide(position, this.state.selector)) ?
              null :
              this.state.selector
          };
        }

        if (this.toolIsSelected(TOOLS.GRABBER)) {
          return {
            action: ACTION_NONE,
            grabberDiff: point(position.x - this.state.selector.x, position.y - this.state.selector.y)
          };
        }
      })
      .onRelease((position, pressPosition) => {
        const pointer = (this.state.grabberDiff) ?
          point(pressPosition.x - this.state.grabberDiff.x, pressPosition.y - this.state.grabberDiff.y) :
          this.state.pointer;

        return { 
          resizeSide: RESIZE_NONE,
          action: (this.state.grabberDiff) ? ACTION_FIRE : ACTION_NONE,
          pointer,
          tempSelector: null,
          grabberDiff: null
        };
      })
      .onHoverOver(position => {
        // TODO: show the resizing mouse pointer somehow
        return (this.toolIsSelected(TOOLS.SELECTOR) && this.state.selector && getResizeSide(position, this.state.selector)) ?
          { action: ACTION_NONE, pointer: null } :
          { action: ACTION_NONE, pointer: getPointer(position) };
      })
      .onDrag(position => {
        if (this.toolIsSelected(TOOLS.TILE_BRUSH, TOOLS.ERASER)) {
          return {
            pointer: position,
            action: ACTION_FIRE
          };
        }
        else if (this.toolIsSelected(TOOLS.SELECTOR)) {
          return this.handleSelectorSizing(position);
        }
        else if (this.toolIsSelected(TOOLS.GRABBER)) {
          return this.handleGrabberMove(position);
        }
      })
      .onOut(position => {
        return { 
          action: ACTION_NONE,
          resizeSide: RESIZE_NONE
        };
      })
      ._HANDLE_SIDE_EFFECTS(result => {
        if (!result) {
          return;
        }

        this.setState(result);

        if (this.state.action !== ACTION_FIRE) {
          return;
        }

        if (this.state.selector) {
          this.props.onSelectorAction(this.state.pointer, this.state.selector);
        }
        else {
          this.props.onPointerAction(this.state.pointer);
        }
      });

    _RENDER_LOOP((elapsed, fps) => {
      context.clearRect(0, 0, this.props.width, this.props.height);

      if (this.state.pointer && inputer.isActive() && POINTER_TOOLS.findIndex(toolName => toolName === this.props.selectedToolId) !== -1) {
        drawRect(context, this.state.pointer, POINTER_COLOR);
      }

      if (this.state.selector) {
        drawRect(context, this.state.selector, SELECTED_COLOR, SELECTED_FILL_COLOR);
      }

      if (this.state.tempSelector) {
        drawRect(context, this.state.tempSelector, TEMP_SELECTOR_COLOR);
      }      

      return CONTINUE;
    });
  }

  toolIsSelected(...toolIds) {
    return toolIds.find(toolId => this.props.selectedToolId === toolId);
  }

  handleGrabberMove(position) {
    const newState = {
      action: ACTION_NONE 
    };

    if (this.state.selector) {
      newState.selector = getMoveableSelector(position, this.state.selector, this.state.grabberDiff);
      newState.tempSelector = this.state.tempSelector || clone(this.state.selector);
    }

    return newState;
  }

  handleSelectorSizing(position) {
    const newState = {
      action: ACTION_NONE 
    };

    if (this.state.resizeSide) {
      newState.selector = getResizableSelector(position, this.state.selector, this.state.resizeSide);
    } else {
      if (this.state.selector) {
        newState.resizeSide = getResizeSide(position, this.state.selector);
      }
     
      if (!newState.resizeSide)  {
        newState.selector = getSelector(position, this.state.selector || this.state.pointer);
        newState.pointer = null;
      }
    }

    return newState;
  }

  render() {
    const canvasClass = 'inputLayerCanvas' + (this.state.resizing ? ' resize' : '');

    return (
      <canvas 
        className={ canvasClass }
        width={ this.props.width }
        height={ this.props.height }
        ref="canvas">
      </canvas>
    );
  }
}
