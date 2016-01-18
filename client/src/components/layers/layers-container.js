/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayerToolbar from '../toolbars/layer-toolbar.js';
import Layer from './layer.js';
import InputLayer from './input-layer.js';
import * as TOOLS from '../../constants/tools.js';
import { addTile, fillTilesWith, fillTileSelection,
  moveTileSelection, fillContiguousTiles } from '../../actions/layers.js';
import Viewport from '../../lib/viewport.js';

class Layers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: Viewport(0, 0, 400, 400)
    };
  }

  triggerSelectorAction(position, selection) {
    const { dispatch, filters } = this.props,
      tileId = filters.get('selectedTileIndex');

    switch (filters.get('selectedToolId')) {
      case TOOLS.ERASER:
        dispatch(fillTileSelection(selection));
        return;
      case TOOLS.FILL:
        dispatch(fillTileSelection(selection, tileId));
        return;
      case TOOLS.FILL_EMPTY:
        dispatch(fillTileSelection(selection, tileId, true));
        return;
      case TOOLS.TILE_BRUSH:
        dispatch(addTile(position, tileId, selection));
        return;
      case TOOLS.FILL_CONTIGUOUS:
        dispatch(fillContiguousTiles(position, tileId, true, selection));
        return;
      case TOOLS.FILL_CONTIGUOUS_EMPTY:
        dispatch(fillContiguousTiles(position, tileId, false, selection));
        return;
      case TOOLS.GRABBER:
        dispatch(moveTileSelection(position, selection));
        return; 
    }
  }

  triggerPointerAction(position) {
    const { dispatch, filters } = this.props,
      tileId = filters.get('selectedTileIndex');

    switch (filters.get('selectedToolId')) {
      case TOOLS.ERASER:
        dispatch(addTile(position));
        return;
      case TOOLS.FILL:
        dispatch(fillTilesWith(tileId));
        return;
      case TOOLS.FILL_EMPTY:
        dispatch(fillTilesWith(tileId, true));
        return;
      case TOOLS.TILE_BRUSH:
        dispatch(addTile(position, tileId));
        return;
      case TOOLS.FILL_CONTIGUOUS:
        dispatch(fillContiguousTiles(position, tileId, true));
        return;
      case TOOLS.FILL_CONTIGUOUS_EMPTY:
        dispatch(fillContiguousTiles(position, tileId));
        return;
    }
  }

  render() {
    const { layers, tileSheets, filters } = this.props;
    const activeLayer = layers.get(filters.get('activeLayerId'));
    const width = (activeLayer) ? activeLayer.get('width') : 400;
    const height = (activeLayer) ? activeLayer.get('height') : 400;
    const viewport = this.state.viewport;
    const activeTileSetId = filters.get('activeTileSetId');
    const activeTileSet = tileSheets.get(activeTileSetId);
    const tileImages = (activeTileSet) ? activeTileSet.get('tileImages') : null;
    const tiles = (activeTileSet) ? activeTileSet.get('tiles') : null;
    const tileData = (tiles && tiles.size) ? tiles.toJS() : null;

    return (
      <div>
        <LayerToolbar activeLayer={ activeLayer } />
        <ul className="layersContainer">
        {
          layers
            .map(layer => {
              const layerId = layer.get('id');
              return (
                <li className="layer" key={ layerId }>
                  <Layer
                    layer={ layer }
                    tileImages={ tileImages }
                    tileData={ tileData }
                    viewport={ viewport }
                    visible={ filters.get('layerVisibility').get(layerId) }
                    renderLoop={ this.props.renderLoop }
                  />
                </li>
              );
            })
            .valueSeq()
        }
          <InputLayer
            ref="inputLayer"
            width={ width }
            height={ height }
            selectedToolId={ filters.get('selectedToolId') }
            onSelectorAction={ this.triggerSelectorAction.bind(this) }
            onPointerAction={ this.triggerPointerAction.bind(this) }
          />
        </ul>
      </div>
    );
  } 
}

function select(state) {
  return { 
    layers: state.get('layers'),
    filters: state.get('filters'),
    tileSheets: state.get('tileSheets')
  };
}

export default connect(select)(Layers);
