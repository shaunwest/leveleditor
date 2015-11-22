/**
 * Created by shaunwest on 11/11/15.
 */

import React, { Component } from 'react';

export default class LayerToolbar extends Component {
  render() {
    const activeLayer = this.props.activeLayer;

    if (activeLayer) {
      return (
        <ul>
          <li>Width <input type="text" value={ activeLayer.get('width') } readOnly /></li>
          <li>Height <input type="text" value={ activeLayer.get('height') } readOnly /></li>
          <li>Repeating <input type="checkbox" onChange={ e => {} } /></li>
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
