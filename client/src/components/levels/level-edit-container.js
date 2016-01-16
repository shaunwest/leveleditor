/**
 * Created by shaunwest on 9/7/15.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { DATA_PATH } from '../../paths.js';

import LayerSelect from '../selectors/layer-select.js';
import ToolSelect from '../selectors/tool-select.js';
import TileSheetSelect from '../selectors/tile-sheet-select.js';
import TileSelect from '../selectors/tile-select.js';
import LayersContainer from '../layers/layers-container.js';

import { fetchAndSelectLevel } from '../../dispatchers/levels.js';

import { selectTileSheet, selectTile, fetchAll as fetchAllTileSheets } from '../../reducers/tile-sheets-actions.js';
import { selectedTool } from '../../reducers/tools-actions.js';
import { selectLayer, toggleLayer } from '../../reducers/layers-actions.js';

import Looper, { TARGET_FPS } from '../../lib/looper.js';

class LevelEditContainer extends Component {
  componentDidMount() {
    const { dispatch, levels } = this.props,
      levelId = levels.get('currentLevelId');

    this.dispatch = dispatch;
    this.renderLoop = Looper();

    dispatch(fetchAndSelectLevel(levelId));
    dispatch(fetchAllTileSheets(DATA_PATH + '/tile-sheets.json'));
  }

  onToolSelect(toolId) {
    const { dispatch } = this.props;
    dispatch(selectedTool(toolId));
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
    const { levels, layers, tileSheets, tools, currentTileSet, filters } = this.props,
      levelId = levels.get('currentLevelId'),
      level = levels.get('items').get(levelId),
      description = (level) ? level.get('description') : '...';

    return (
      <div>
        <h2>{ description }</h2>

        <h3>Layers</h3>

        <LayerSelect 
          layers={ layers }
          activeLayerId={ filters.get('activeLayerId') }
          visibleLayers={ filters.get('layerVisibility').toJS() }
          onToggle={ this.onLayerToggle.bind(this) }
          onSelect={ this.onLayerSelect.bind(this) } />

        <LayersContainer renderLoop={ this.renderLoop } />

        <h3>Tools</h3>

        <ToolSelect
          onToolSelect={ this.onToolSelect.bind(this) }
          selectedToolId={ tools.get('selectedId') } />

        <h3>Tiles</h3>

        <TileSheetSelect
          onTileSheetSelect={ this.onTileSheetSelect.bind(this) }
          tileSheets={ tileSheets.get('items') }
          selectedTileSheetId={ currentTileSet.get('id') } />

        <TileSelect
          onTileSelect={ this.onTileSelect.bind(this) }
          selectedTileId={ currentTileSet.get('currentTileIndex') }
          tileImages={ currentTileSet.get('tileImages') } />
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
    currentTileSet: state.get('currentTileSet'),
    filters: state.get('filters')
  };
}

export default connect(select)(LevelEditContainer);
