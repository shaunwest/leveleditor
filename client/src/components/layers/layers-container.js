/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayerToolbar from '../toolbars/layer-toolbar.js';
import Layer from './layer.js';
import InputLayer from './input-layer.js';
import * as TOOLS from '../../constants/tools.js';
import { removeTile } from '../../reducers/layers-actions.js';
import { addTile, fillTilesWith, fillTileSelection,
  moveTileSelection, fillContiguousTiles } from '../../dispatchers/layers.js';
import Viewport from '../../lib/viewport.js';

class Layers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: Viewport(0, 0, 400, 400)
    };
  }

  triggerSelectorAction(position, selection) {
    const { dispatch, tools, currentTileSet } = this.props,
      tileId = currentTileSet.get('currentTileIndex');

    switch (tools.get('selectedId')) {
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
    const { dispatch, tools, currentTileSet } = this.props,
      tileId = currentTileSet.get('currentTileIndex');

    switch (tools.get('selectedId')) {
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
    const { layers, currentTileSet, tools, filters, tiledLayouts } = this.props;
    const tileImages = currentTileSet.get('tileImages');
    const tiles = currentTileSet.get('tiles');
    const tileData = (tiles && tiles.size) ? tiles.toJS() : null;
    const activeLayer = layers.get(filters.get('activeLayerId'));
    const width = (activeLayer) ? activeLayer.get('width') : 400;
    const height = (activeLayer) ? activeLayer.get('height') : 400;
    const viewport = this.state.viewport;

    return (
      <div>
        <LayerToolbar activeLayer={ activeLayer } />
        <ul className="layersContainer">
        {
          layers
            .map(layer => {
              const layerId = layer.get('id');
              const layoutId = layer.get('layoutId');
              const layout = tiledLayouts.get(layoutId);
              return (
                <li className="layer" key={ layerId }>
                  <Layer
                    layer={ layer }
                    layout={ layout }
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
            selectedToolId={ tools.get('selectedId') }
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
    tools: state.get('tools'),
    currentTileSet: state.get('currentTileSet'),
    filters: state.get('filters'),
    tiledLayouts: state.get('tiledLayouts')
  };
}

export default connect(select)(Layers);
