/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayerToolbar from '../toolbars/layer-toolbar.js';
import Layer from './layer.js';
import InputLayer from './input-layer.js';
import * as TOOLS from '../../constants/tools.js';
import { removeTile } from '../../modules/layers/layers-actions.js';
import { addTile, fillTilesWith, fillTileSelection, moveTileSelection } from '../../modules/layers/layers-update.js';

class Layers extends Component {
  constructor(props) {
    super(props);
  }

  triggerToolAction(position, selection) {
    const { dispatch, tools, currentTileSet } = this.props,
      tileIndex = currentTileSet.get('currentTileIndex');

    switch (tools.get('selectedId')) {
      case TOOLS.ERASER:
        dispatch(fillTileSelection(selection));
        return;
      case TOOLS.FILL:
        dispatch(fillTileSelection(selection, tileIndex));
        return;
      case TOOLS.TILE_BRUSH:
        dispatch(addTile(position, tileIndex, selection));
        return;
      case TOOLS.GRABBER:
        dispatch(moveTileSelection(position, selection));
        return; 
    }
  }

  componentWillReceiveProps(nextProps) {
    const { layers } = this.props,
      activeLayerIndex = nextProps.activeLayerIndex;

    this.setState({ activeLayer: layers.get(activeLayerIndex) });
  }

  render() {
    const { layers, currentTileSet, tools } = this.props;
    const tileImages = currentTileSet.get('tileImages');
    const tiles = currentTileSet.get('tiles');
    const tileData = (tiles && tiles.size) ? tiles.toJS() : null;
    const activeLayer = layers.get(this.props.activeLayerIndex);
    const width = (activeLayer) ? activeLayer.get('width') : 400;
    const height = (activeLayer) ? activeLayer.get('height') : 400;

    // maybe renderers should be created here and passed to layers?
    // or should there be a debug data model passed into each layer?
    // or should layers share a renderer? (removing the need for multiple layer components)
    //  ... eh probably want to be able to easily layer different types of layers over each other

    return (
      <div>
        <LayerToolbar activeLayer={ activeLayer } />
        <ul className="layersContainer">
        {
          layers
            .map(layer => {
              return (
                <li className="layer" key={ layer.get('id') }>
                  <Layer
                    layer={ layer }
                    tileImages={ tileImages }
                    tileData={ tileData }
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
          onMouseDown={ this.triggerToolAction.bind(this) }
          onMouseMove={ this.triggerToolAction.bind(this) }
        />
        </ul>
      </div>
    );
  } 
}

function select(state) {
  return { 
    layers: state.get('layers').get('items'),
    tools: state.get('tools'),
    currentTileSet: state.get('currentTileSet')
  };
}

export default connect(select)(Layers);
