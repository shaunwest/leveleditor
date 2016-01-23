/**
 * Created by shaunwest on 11/17/15.
 */

import React, { Component } from 'react';
import Inputer from '../../lib/inputer.js';

import { drawRect } from '../../lib/draw.js';
import { point, rect } from '../../lib/geom.js';
import { Selector, ResizableSelector, MoveableSelector,
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

const getSelector = Selector();
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
      tempSelector: null
    };
  }

  componentDidMount() {
    const props = this.props,
      state = this.state,
      canvas = this.refs.renderer.getCanvas();

    this.renderContext = canvas.getContext('2d');

    const inputer = new Inputer(canvas);

    inputer.onUpdate((input) => {
      //console.log(input.isPressed, input.activePressPosition, input.isDragging, input.isHovering);
      const previousState = this.state;

      if (input.isDragging) {
        if (this.toolIsSelected(Tools.TILE_BRUSH, Tools.ERASER)) {
          this.setState({
            pointer: getPointer(input.position)
          });
          this.props.onPointerAction(this.state.pointer);
        }
        else if (this.toolIsSelected(Tools.SELECTOR)) {
          if (previousState.resizeSide) {
            this.setState({ 
              selector: getResizableSelector(input.position, previousState.selector, previousState.resizeSide) 
            });
          }
          else {
            const resizeSide = (previousState.selector) ?
              getResizeSide(input.position, previousState.selector) :
              null;

            if (!resizeSide) {
              this.setState({
                selector: getSelector(input.position, previousState.selector || input.lastPosition),
                pointer: null
              });
            }
            else {
              this.setState({
                resizeSide
              });
            }
          }

          this.props.onSelectorAction(input.position, this.state.selector);
        }
        else if (this.toolIsSelected(Tools.GRABBER)) {
          if (previousState.selector) {
            this.setState({
              selector: getMoveableSelector(input.position, previousState.selector, previousState.grabberDiff),
              tempSelector: previousState.tempSelector || clone(previousState.selector)
            });
          }
        }
      }
      else if (input.isPressed) {
        if (this.toolIsSelected(Tools.SELECTOR)) {
          if (previousState.selector && !getResizeSide(this.state.pointer, previousState.selector)) {
            this.setState({
              pointer: getPointer(input.position),
              selector: null
            });
            this.props.onSelectorAction(this.state.pointer, previousState.selector);
          }
          else {
            this.setState({
              pointer: getPointer(input.position),
            });
            this.props.onPointerAction(this.state.pointer);
          } 
        } 
        else if (this.toolIsSelected(Tools.GRABBER)) {
          this.setState({
            grabberDiff: point(input.position.x - previousState.selector.x, input.position.y - previoiusState.selector.y)
          });
        }
        else {
          const pointer = getPointer(input.position);
          this.setState({ pointer });
          this.props.onPointerAction(pointer);
        }
      }
      // TODO: hovering vs. !pressed is confusing. Think about this more...
      /*
      else if (input.isHovering) {
        if (this.toolIsSelected(Tools.SELECTOR) && previousState.selector && getResizeSide(input.position, previousState.selector)) { 
          this.setState({
            pointer: null
          });
        }
        else {
          this.setState({
            pointer: getPointer(input.position),
            resizeSide: RESIZE_NONE
          });
        }
      } 
      */
      else if (!input.isPressed) {
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
            grabberDiff: null
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
    });
  }

  toolIsSelected(...toolIds) {
    return toolIds.find(toolId => this.props.selectedToolId === toolId);
  }

  render() {
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

      if (this.state.pointer && isActive && PointerTools.findIndex(toolName => toolName === selectedToolId) !== -1) {
        drawRect(context, this.state.pointer, POINTER_COLOR);
      }

      if (this.state.selector) {
        drawRect(context, this.state.selector, SELECTED_COLOR, SELECTED_FILL_COLOR);
      }

      if (this.state.tempSelector) {
        drawRect(context, this.state.tempSelector, TEMP_SELECTOR_COLOR);
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
