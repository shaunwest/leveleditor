/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayerToolbar from '../toolbars/layer-toolbar.js';
import Layer from './layer.js';
import InputLayer from './input-layer.js';
import * as Tools from '../../constants/tools.js';
import { addTile, fillTilesWith, fillTileSelection,
  moveTileSelection, fillContiguousTiles } from '../../actions/layers.js';
import Viewport from '../../lib/viewport.js';

class Layers extends Component {
  constructor(props) {
    super(props);

    // FIXME: viewport size should be in the datastore
    // But maybe not viewport position?
    this.state = {
      viewport: Viewport(0, 0, 400, 256)
    };
  }

  // TODO: Move these actions to input layer
  // (but not until input layer is broken down)
  triggerSelectorAction(position, selection) {
    const { dispatch, filters } = this.props,
      tileId = filters.get('selectedTileIndex');

    switch (filters.get('selectedToolId')) {
      case Tools.ERASER:
        dispatch(fillTileSelection(selection));
        return;
      case Tools.FILL:
        dispatch(fillTileSelection(selection, tileId));
        return;
      case Tools.FILL_EMPTY:
        dispatch(fillTileSelection(selection, tileId, true));
        return;
      case Tools.TILE_BRUSH:
        dispatch(addTile(position, tileId, selection));
        return;
      case Tools.FILL_CONTIGUOUS:
        dispatch(fillContiguousTiles(position, tileId, true, selection));
        return;
      case Tools.FILL_CONTIGUOUS_EMPTY:
        dispatch(fillContiguousTiles(position, tileId, false, selection));
        return;
      case Tools.GRABBER:
        dispatch(moveTileSelection(position, selection));
        return; 
    }
  }

  triggerPointerAction(position) {
    const { dispatch, filters } = this.props,
      tileId = filters.get('selectedTileIndex');

    switch (filters.get('selectedToolId')) {
      case Tools.ERASER:
        dispatch(addTile(position));
        return;
      case Tools.FILL:
        dispatch(fillTilesWith(tileId));
        return;
      case Tools.FILL_EMPTY:
        dispatch(fillTilesWith(tileId, true));
        return;
      case Tools.TILE_BRUSH:
        dispatch(addTile(position, tileId));
        return;
      case Tools.FILL_CONTIGUOUS:
        dispatch(fillContiguousTiles(position, tileId, true));
        return;
      case Tools.FILL_CONTIGUOUS_EMPTY:
        dispatch(fillContiguousTiles(position, tileId));
        return;
    }
  }

  render() {
    const { layers, filters } = this.props;
    const activeLayer = layers.get(filters.get('activeLayerId'));
    const viewport = this.state.viewport;

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
                    layerId={ layerId }
                    viewport={ viewport }
                    renderLoop={ this.props.renderLoop }
                  />
                </li>
              );
            })
            .valueSeq()
        }
          <InputLayer
            ref="inputLayer"
            viewport={ viewport }
            selectedToolId={ filters.get('selectedToolId') }
            renderLoop={ this.props.renderLoop }
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
    filters: state.get('filters')
  };
}

export default connect(select)(Layers);
