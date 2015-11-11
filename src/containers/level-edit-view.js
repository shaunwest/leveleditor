/**
 * Created by shaunwest on 9/7/15.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import LayerSelect from '../components/selectors/layer-select.js';
import ToolSelect from '../components/selectors/tool-select.js';
import TileSheetSelect from '../components/selectors/tile-sheet-select.js';
import TileSelect from '../components/selectors/tile-select.js';
import Layers from '../components/layers/layers.js';

import { fetchLevel, fetchAndSelectLevel } from '../modules/levels/levels-fetch.js';
import { selectTileSheet, selectTile, fetchAll as fetchAllTileSheets } from '../modules/tile-sheets/fetch-tile-sheets.js';
import { selectedTool } from '../modules/tools/select-tools.js';
import { addTile, removeTile, selectLayer, toggleLayer } from '../modules/layers/layers-actions.js';
import { fillTilesWith } from '../modules/layers/layers-update.js';

function getTilePosition(pixelX, pixelY, width) {
  const widthInTiles = Math.floor(width / 16),
    tileY = Math.floor(pixelY / 16),
    tileX = Math.floor(pixelX / 16);

  return (tileY * widthInTiles) + tileX;
}

class LevelEditView extends Component {
  componentDidMount() {
    const { dispatch, levels } = this.props,
      levelId = levels.get('currentLevelId');

    this.dispatch = dispatch;

    dispatch(fetchAndSelectLevel(levelId));
    dispatch(fetchAllTileSheets('/data/tile-sheets.json'));
  }

  onToolSelect(toolId) {
    const { dispatch } = this.props;
    dispatch(selectedTool(toolId));
  }

  onToolAction(toolId, x, y) {
    const tilePosition = getTilePosition(x, y, 400),
      { dispatch, currentTileSet } = this.props,
      tileIndex = currentTileSet.get('currentTileIndex');

    switch (toolId) {
      case 'addTile':
        dispatch(addTile(tilePosition, tileIndex));
        return;
      case 'removeTile':
        dispatch(removeTile(tilePosition));
        return;
      case 'fillTiles':
        dispatch(fillTilesWith(tileIndex));
        return;
    }
  }

  onTileSelect(tileIndex) {
    this.dispatch(selectTile(tileIndex));
  }

  onTileSheetSelect(id) {
    this.dispatch(selectTileSheet(id));
  }

  onLayerSelect(layerIndex) {
    this.dispatch(selectLayer(layerIndex));
  }

  onLayerToggle(on, layerIndex) {
    this.dispatch(toggleLayer(layerIndex, on));
  }

  render() {
    const { levels, layers, tileSheets, tools, currentTileSet } = this.props,
      levelId = levels.get('currentLevelId'),
      level = levels.get('items').get(levelId),
      description = (level) ? level.get('description') : '...';

    return (
      <div>
        <h2>{ description }</h2>

        <h3>Layers</h3>

        <LayerSelect 
          layers={ layers.get('items') }
          onToggle={ this.onLayerToggle.bind(this) }
          onSelect={ this.onLayerSelect.bind(this) }>
        </LayerSelect>

        <Layers
          toolId={ tools.get('selectedId') }
          layers={ layers.get('items') }
          tileImages={ currentTileSet.get('tileImages') }
          onToolAction={ this.onToolAction.bind(this) }
          width="400"
          height="400">
        </Layers>

        <h3>Tools</h3>

        <ToolSelect
          onToolSelect={ this.onToolSelect.bind(this) }>
        </ToolSelect>

        <h3>Tiles</h3>

        <TileSheetSelect
          onTileSheetSelect={ this.onTileSheetSelect.bind(this) }
          tileSheets={ tileSheets.get('items') }>
        </TileSheetSelect>

        <TileSelect
          onTileSelect={ this.onTileSelect.bind(this) }
          tileImages={ currentTileSet.get('tileImages') }>
        </TileSelect>
      </div>
    );
  }
}

function select(state) {
  return { 
    levels: state.get('levels'), 
    layers: state.get('layers'),
    tileSheets: state.get('tileSheets'),
    tools: state.get('tools'),
    currentTileSet: state.get('currentTileSet')
  };
}

export default connect(select)(LevelEditView);
