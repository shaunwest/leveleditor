/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';
import * as TOOLS from '../../constants/tools.js';

export default class ToolSelect extends Component {
  render() {
    const selectedToolId = this.props.selectedToolId;

    return (
      <ul>
        <li>
          <input
            type="radio"
            onChange={ e => this.props.onToolSelect(TOOLS.GRABBER) }
            checked={ selectedToolId === TOOLS.GRABBER }
          /> Grabber
        </li>
        <li>
          <input
            type="radio"
            onChange={ e => this.props.onToolSelect(TOOLS.TILE_BRUSH) }
            checked={ selectedToolId === TOOLS.TILE_BRUSH }
          /> Tile Brush
        </li>
        <li>
          <input
            type="radio"
            onChange={ e => this.props.onToolSelect(TOOLS.ERASER) }
            checked={ selectedToolId === TOOLS.ERASER }
          /> Eraser (TODO Eraser Fill vs Eraser Brush)
        </li>
        <li>
          <input
            type="radio"
            onChange={ e => this.props.onToolSelect(TOOLS.SELECTOR) }
            checked={ selectedToolId === TOOLS.SELECTOR }
          /> Selector
        </li>
        <li>
          <input
            type="radio"
            onChange={ e => this.props.onToolSelect(TOOLS.FILL) }
            checked={ selectedToolId === TOOLS.FILL }
          /> Fill
        </li>
        <li>
          <input
            type="radio"
            onChange={ e => this.props.onToolSelect(TOOLS.FILL_EMPTY) }
            checked={ selectedToolId === TOOLS.FILL_EMPTY }
          /> Fill Empty
        </li>
        <li>
          <input
            type="radio"
            onChange={ e => this.props.onToolSelect(TOOLS.FILL_CONTIGUOUS) }
            checked={ selectedToolId === TOOLS.FILL_CONTIGUOUS }
          /> Fill Contiguous
        </li>
        <li>
          <input
            type="radio"
            onChange={ e => this.props.onToolSelect(TOOLS.FILL_CONTIGUOUS_EMPTY) }
            checked={ selectedToolId === TOOLS.FILL_CONTIGUOUS_EMPTY }
          /> Fill Empty Contiguous
        </li>
      </ul>
    );
  }
}
