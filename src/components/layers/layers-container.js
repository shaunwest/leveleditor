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
    this.state = { mouseIsDown: false };
  }

  mouseDown(position, selection) {
    this.setState({ mouseIsDown: true });
    this.triggerToolAction(position, selection);
  }

  mouseUp(position) {
    this.setState({ mouseIsDown: false });
  }

  mouseMove(position, selection) {
    if (this.state.mouseIsDown) {
      this.triggerToolAction(position, selection);
    }
  }

  triggerToolAction(position, selection) {
    const { dispatch, tools, currentTileSet } = this.props,
      tileIndex = currentTileSet.get('currentTileIndex');

    switch (tools.get('selectedId')) {
      case TOOLS.ERASER:
        dispatch(fillTileSelection(undefined, selection));
        return;
      case TOOLS.FILL:
        dispatch(fillTileSelection(tileIndex, selection));
        return;
      case TOOLS.TILE_BRUSH:
        dispatch(addTile(position, tileIndex, selection));
        return;
      case TOOLS.GRABBER:
        //dispatch(moveTileSelection(tileIndex, selection, position));
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
    const activeLayer = layers.get(this.props.activeLayerIndex);
    const width = (activeLayer) ? activeLayer.get('width') : 400;
    const height = (activeLayer) ? activeLayer.get('height') : 400;

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
                    tileImages={ tileImages }>
                  </Layer>
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
          onMouseDown={ this.mouseDown.bind(this) }
          onMouseMove={ this.mouseMove.bind(this) }
          onMouseUp={ this.mouseUp.bind(this) }
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
