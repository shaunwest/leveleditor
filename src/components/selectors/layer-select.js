/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';

export default class LayerSelect extends Component {
  render() {
    const layers = this.props.layers;

    return (
      <ul>
      { 
        layers
          .map((layer, index) => {
            return (
              <li key={ layer.get('id') }>
                <input type="checkbox" onClick={ e => this.props.onToggle(e.target.checked, index) } checked={ layer.get('visible') } />
                <button onClick={ e => this.props.onSelect(index) }>{ layer.get('label') }</button>
              </li>
            );
          })
          .valueSeq() 
      }
      </ul>
    );
  } 
}
