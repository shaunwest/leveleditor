/**
 * Created by shaunwest on 11/11/15.
 */

import React, { Component } from 'react';

export default class LayerToolbar extends Component {
  render() {
    const activeLayer = this.props.activeLayer,
      viewport = this.props.viewport;

    if (activeLayer) {
      return (
        <ul>
          <li>
            <label>Width</label>
            <input type="text" value={ activeLayer.width } readOnly />
          </li>
          <li>
            <label>Height</label>
            <input type="text" value={ activeLayer.height } readOnly />
          </li>
          <li>
            <label>VX</label>
            <input 
              type="text"
              value={ viewport.x }
              onChange={ e => this.props.onViewportUpdate({ x: (e.target.value === '') ? 0 : parseInt(e.target.value) }) }
            />
          </li>
          <li>
            <label>VY</label>
            <input
              type="text"
              value={ viewport.y }
              onChange={ e => this.props.onViewportUpdate({ y: (e.target.value === '') ? 0 : parseInt(e.target.value) }) }
            />
          </li>
          <li>
            <label>VWidth</label>
            <input
              type="text"
              value={ viewport.width }
              onChange={ e => this.props.onViewportUpdate({ width: (e.target.value === '') ? 0 : parseInt(e.target.value) }) }
            />
          </li>
          <li>
            <label>VHeight</label>
            <input
              type="text"
              value={ viewport.height }
              onChange={ e => this.props.onViewportUpdate({ height: (e.target.value === '') ? 0 : parseInt(e.target.value) }) }
            />
          </li>
          <li>
            <label>Repeating</label>
            <input 
              type="checkbox"
              onChange={ e => {} }
            />
          </li>
          <li><button>Save</button></li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li>...</li>
        </ul>
      );
    }
  } 
}
