/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';
import Layer from './layer.js';

export default class Layers extends Component {
  render() {
    const layers = this.props.layers;

    return (
      <ul className="layersContainer">
      {
        layers
          .map((layer) => {
            return (
              <li className="layer" key={ layer.get('id') }>
                <Layer
                  layer={ layer }
                  tileImages={ this.props.tileImages }
                  width={ this.props.width }
                  height={ this.props.height }
                  toolId={ this.props.toolId }
                  onToolAction={ this.props.onToolAction }>
                </Layer>
              </li>
            );
          })
          .valueSeq()
      }
      </ul>
    );
  } 
}
