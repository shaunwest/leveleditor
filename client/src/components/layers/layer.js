/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
//import RenderPerf from '../debug/render-perf.js';
import TileRenderer from '../renderers/tiled.js';

export default class Layer extends Component {
  render() {
    const { layers, tileSheets, filters } = this.props;

    const layerId = this.props.layerId;
    const renderLoop = this.props.renderLoop;
    const viewport = this.props.viewport;

    const visible = filters.get('layerVisibility').get(layerId);
    const layer = layers[layerId];
    const activeTileSet = tileSheets.get(filters.get('activeTileSetId'));
    const tileImages = (activeTileSet) ? activeTileSet.get('tileImages') : null;
    const layout = layer.layout;
    const spritesArray = (layout && layout.length) ? layout : null;
    const spriteSequences = (tileImages && tileImages.size) ? tileImages.toJS() : null;

    /*
    if (layout.size && this.intervalId) {
      initSync(layout);
    }
    */

    return (
      <div
        className="layerContainer"
        style={{ display: visible ? 'block' : 'none' }}>
        <TileRenderer 
          renderLoop={ renderLoop }
          spritesArray={ spritesArray }
          spriteSequences={ spriteSequences }
          tileSize={ layer.tileSize }
          viewport={ viewport }
          regionWidth={ layer.width }
        />
      </div>
    );
  }

  /*
  initSync() {
    this.layout = layout.toArray();

    this.intervalId = setInterval(() => {
      const { layers, filters } = this.props;
      const activeLayerId = filters.get('activeLayerId');
      const activeLayer = layers.get(activeLayerId);
      const layout = activeLayer.get('layout');
      const layerWidth = activeLayer.get('width');

      this.layout = layout.toArray();
    }, 100);
  }
  */
}

function select(state) {
  return { 
    layers: state.get('layers'),
    filters: state.get('filters'),
    tileSheets: state.get('tileSheets')
  };
}

export default connect(select)(Layer);
