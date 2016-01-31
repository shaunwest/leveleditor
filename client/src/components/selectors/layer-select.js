/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';

export default class LayerSelect extends Component {
  render() {
    const layers = this.props.layers,
      activeLayerId = this.props.activeLayerId,
      visibleLayers = this.props.visibleLayers;

    return (
      <ul>
      { 
        Object.keys(layers)
          .map(layerId => {
            const layer = layers[layerId];
            const isActive = activeLayerId === layerId;
            const isVisible = visibleLayers[layerId];
            return (
              <li key={ layerId }>
                { layer.label }
                <ul>
                  <li><input type="checkbox" onChange={ e => this.props.onToggle(e.target.checked, index) } checked={ isVisible } /> Visible</li>
                  <li><input type="radio" onChange={ e => this.props.onSelect(index) } checked={ isActive }/> Active</li>
                </ul>
              </li>
            );
          })
      }
      </ul>
    );
  } 
}
