/**
 * Created by shaunwest on 11/17/15.
 */

import React, { Component } from 'react';
import Inputer from '../../lib/inputer.js';
import { point, rect } from '../../lib/geom.js';
import { Selector, ResizableSelector, MoveableSelector,
  getResizeSide, RESIZE_NONE } from '../../lib/selector.js';
import { Pointer } from '../../lib/pointer.js';
import InputRenderer from '../renderers/input.js';

import { clone } from '../../lib/obj.js';
import * as Tools from '../../constants/tools.js';

const POINTER_WIDTH = 16,
  POINTER_HEIGHT = 16,
  ACTION_NONE = 'actionNone',
  ACTION_FIRE = 'actionFire';

const getSelector = Selector();
const getResizableSelector = ResizableSelector();
const getMoveableSelector = MoveableSelector();
const getPointer = Pointer(POINTER_WIDTH, POINTER_HEIGHT);

export default class InputLayer extends Component {
  constructor(props) {
    super(props);

    // change to inputState so state can be mutated
    // and the renderer won't re-render on a change
    // - maybe the renderer shouldn't be a react component??
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
      canvas = this.refs.renderer.getCanvas();

    const inputer = new Inputer(canvas);

    // PRESS
    inputer
      .onPress(position => {
        if (this.toolIsSelected(Tools.SELECTOR)) {
          return {
            action: ACTION_FIRE,
            pointer: getPointer(position),
            selector: (this.state.selector && !getResizeSide(position, this.state.selector)) ?
              null :
              this.state.selector
          };
        }

        if (this.toolIsSelected(Tools.GRABBER)) {
          return {
            action: ACTION_NONE,
            grabberDiff: point(position.x - this.state.selector.x, position.y - this.state.selector.y)
          };
        }

        return {
          action: ACTION_FIRE,
          pointer: position
        };
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
        return (this.toolIsSelected(Tools.SELECTOR) && this.state.selector && getResizeSide(position, this.state.selector)) ?
          { action: ACTION_NONE, pointer: null } :
          { action: ACTION_NONE, pointer: getPointer(position) };
      })
      .onDrag(position => {
        if (this.toolIsSelected(Tools.TILE_BRUSH, Tools.ERASER)) {
          return {
            pointer: position,
            action: ACTION_FIRE
          };
        }
        else if (this.toolIsSelected(Tools.SELECTOR)) {
          return this.handleSelectorSizing(position);
        }
        else if (this.toolIsSelected(Tools.GRABBER)) {
          return this.handleGrabberMove(position);
        }
      })
      .onOut(position => {
        return { 
          action: ACTION_NONE,
          resizeSide: RESIZE_NONE
        };
      });

    inputer
      ._HANDLE_SIDE_EFFECTS((result, eventName, isActive) => {
        if (!result) {
          return;
        }

        this.setState(Object.assign(result, { isActive }));

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
    return (
      <InputRenderer
        viewport={ this.props.viewport }
        pointer={ this.state.pointer }
        selector={ this.state.selector }
        tempSelector={ this.state.tempSelector }
        selectedToolId={ this.props.selectedToolId }
        renderLoop={ this.props.renderLoop }
        isActive={ this.state.isActive }
        isResizing={ this.state.resizing }
        ref="renderer"
      />
    );
  }
}
