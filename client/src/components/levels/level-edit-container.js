/**
 * Created by shaunwest on 9/7/15.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DATA_PATH } from '../../paths.js';

import LayersContainer from '../layers/layers-container.js';
import LayerSelect from '../layers/layer-select.js';
import ToolSelect from '../layers/tool-select.js';

import TileSheetSelect from '../tiles/tile-sheet-select.js';
import TileSelect from '../tiles/tile-select.js';
import TileEdit from '../tiles/tile-edit.js';

import { fetchAndSelectLevel } from '../../actions/levels.js';

import { selectTileSheet, selectTile, fetchAll as fetchAllTileSheets } from '../../actions/tile-sheets.js';
import { selectedTool } from '../../actions/tools.js';
import { selectLayer, toggleLayer } from '../../actions/filters.js';

import Looper, { TARGET_FPS } from '../../lib/looper.js';

class LevelEditContainer extends Component {
  constructor(props) {
    super(props);

    this.renderLoop = Looper();
  }

  componentDidMount() {
    const { dispatch, filters } = this.props,
      levelId = filters.get('currentLevelId');

    this.dispatch = dispatch;

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
    const { levels, layers, tileSheets, filters } = this.props,
      levelId = filters.get('currentLevelId'),
      level = levels.get(levelId),
      description = (level) ? level.get('description') : '...',
      activeTileSetId = filters.get('activeTileSetId'),
      activeTileSet = tileSheets.get(activeTileSetId);

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

        <h3>Level Tools</h3>

        <ToolSelect
          onToolSelect={ this.onToolSelect.bind(this) }
          selectedToolId={ filters.get('selectedToolId') } />

        <h3>Tiles</h3>

        <h4>Tile Set Select</h4>
        <TileSheetSelect
          onTileSheetSelect={ this.onTileSheetSelect.bind(this) }
          tileSheets={ tileSheets }
          selectedTileSheetId={ filters.get('activeTileSetId') } />
        
        <h4>Tile Select</h4>
        { (activeTileSet) ?
          <TileSelect
            onTileSelect={ this.onTileSelect.bind(this) }
            selectedTileId={ filters.get('selectedTileIndex') }
            tileImages={ activeTileSet.get('tileImages') } /> : null
        }

        <h4>Tile Edit</h4>
        { (activeTileSet) ?
          <TileEdit
            selectedTileId={ filters.get('selectedTileIndex') }
            tileImages={ activeTileSet.get('tileImages') } /> : null
        }

      </div>
    );
  }
}

function select(state) {
  return { 
    levels: state.get('levels'), 
    layers: state.get('layers'),
    tileSheets: state.get('tileSheets'),
    filters: state.get('filters')
  };
}

export default connect(select)(LevelEditContainer);
