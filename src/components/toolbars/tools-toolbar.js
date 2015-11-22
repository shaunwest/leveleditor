/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';
import * as TOOLS from '../../constants/tools.js';
/*
const TOOL_TILE_BRUSH = 'tileBrush',
  TOOL_ERASER = 'eraser',
  TOOL_SELECTOR = 'selector',
  TOOL_FILL = 'fill';
*/

export default class ToolsToolbar extends Component {
  render() {
    const selectedToolId = this.props.selectedToolId;

    return (
      <ul>
        <li>
          <input
            type="radio"
            onChange={ e => this.props.onToolSelect(TOOLS.TILE_BRUSH) }
            checked={ selectedToolId === TOOLS.TILE_BRUSH }
           />
          Tile Brush
        </li>
        <li>
          <input
            type="radio"
            onChange={ e => this.props.onToolSelect(TOOLS.ERASER) }
            checked={ selectedToolId === TOOLS.ERASER }
          />
          Eraser
        </li>
        <li>
          <input
            type="radio"
            onChange={ e => this.props.onToolSelect(TOOLS.SELECTOR) }
            checked={ selectedToolId === TOOLS.SELECTOR }
          />
          Selector
        </li>
        <li>
          <input
            type="radio"
            onChange={ e => this.props.onToolSelect(TOOLS.FILL) }
            checked={ selectedToolId === TOOLS.FILL }
          />
          Fill
        </li>
      </ul>
    );
  }
}
