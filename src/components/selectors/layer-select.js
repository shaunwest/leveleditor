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
          .map(function (layer) {
            return (
              <li key={ layer.get('id') }>
                <input type="checkbox" /><button>{ layer.get('label') }</button>
              </li>
            );
          })
          .valueSeq() 
      }
      </ul>
    );
  } 
}
