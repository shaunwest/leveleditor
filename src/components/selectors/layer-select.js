/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';

export default class LayerSelect extends Component {
  render() {
    const layers = this.props.layers,
      activeLayerIndex = this.props.activeLayerIndex;

    return (
      <ul>
      { 
        layers
          .map((layer, index) => {
            const isActive = !!(index === activeLayerIndex);
            return (
              <li key={ layer.get('id') }>
                { layer.get('label') }
                <ul>
                  <li><input type="checkbox" onChange={ e => this.props.onToggle(e.target.checked, index) } checked={ layer.get('visible') } /> Visible</li>
                  <li><input type="radio" onChange={ e => this.props.onSelect(index) } checked={ isActive }/> Active</li>
                </ul>
              </li>
            );
          })
          .valueSeq() 
      }
      </ul>
    );
  } 
}
