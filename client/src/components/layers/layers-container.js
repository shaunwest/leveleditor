/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayerToolbar from '../toolbars/layer-toolbar.js';
import Layer from './layer.js';
import InputLayer from './input-layer.js';
import * as Tools from '../../constants/tools.js';
import { addTile, addTiles, fillTileSelection,
  moveTileSelection, fillContiguousTiles } from '../../actions/layers.js';
import { updateViewport } from '../../actions/viewport.js';

class Layers extends Component {
  triggerSelectorAction(position, lastPosition, selection) {
    const { dispatch, filters } = this.props,
      tileId = filters.get('selectedTileIndex');

    switch (filters.get('selectedToolId')) {
      case Tools.ERASER:
        dispatch(fillTileSelection(undefined, selection));
        return;
      case Tools.FILL:
        dispatch(fillTileSelection(tileId, selection));
        return;
      case Tools.FILL_EMPTY:
        dispatch(fillTileSelection(tileId, selection, true));
        return;
      case Tools.TILE_BRUSH:
        dispatch(addTiles(lastPosition, position, tileId, selection));
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

  triggerPointerAction(position, lastPosition) {
    const { dispatch, filters } = this.props,
      tileId = filters.get('selectedTileIndex');

    switch (filters.get('selectedToolId')) {
      case Tools.TILE_BRUSH:
        dispatch(addTiles(lastPosition, position, tileId));
        return;
      case Tools.ERASER:
        dispatch(addTiles(lastPosition, position));
        return;
      case Tools.FILL:
        dispatch(fillTileSelection(tileId));
        return;
      case Tools.FILL_EMPTY:
        dispatch(fillTileSelection(tileId, true));
        return;
      case Tools.FILL_CONTIGUOUS:
        dispatch(fillContiguousTiles(position, tileId, true));
        return;
      case Tools.FILL_CONTIGUOUS_EMPTY:
        dispatch(fillContiguousTiles(position, tileId));
        return;
    }
  }

  triggerViewportUpdate(viewport) {
    const { dispatch } = this.props;
    dispatch(updateViewport(viewport));
  }

  render() {
    const { layers, filters, viewport } = this.props;
    const activeLayer = layers[filters.get('activeLayerId')];
    const viewportObj = viewport.toObject();

    return (
      <div>
        <h3>Layer Properties</h3>
        <LayerToolbar
          activeLayer={ activeLayer }
          viewport={ viewportObj }
          onViewportUpdate={ this.triggerViewportUpdate.bind(this) }
        />
        <ul className="layersContainer">
        {
          Object.keys(layers)
            .map(layerId => {
              return (
                <li className="layer" key={ layerId }>
                  <Layer
                    layerId={ layerId }
                    renderLoop={ this.props.renderLoop }
                  />
                </li>
              );
            })
        }
          <InputLayer
            ref="inputLayer"
            viewport={ viewportObj }
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
    filters: state.get('filters'),
    viewport: state.get('viewport')
  };
}

export default connect(select)(Layers);
