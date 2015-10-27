/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';

export default class ToolSelect extends Component {
  render() {
    return (
      <ul>
        <li onClick={ e => this.props.onToolSelect('tileBrush') }>Tile Brush</li>
        <li onClick={ e => this.props.onToolSelect('eraser') }>Eraser</li>
        <li onClick={ e => this.props.onToolSelect('selector') }>Selector</li>
        <li onClick={ e => this.props.onToolSelect('fill') }>Fill</li>
      </ul>
    );
  }
}
