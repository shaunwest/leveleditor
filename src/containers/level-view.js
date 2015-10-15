/**
 * Created by shaunwest on 9/7/15.
 */

import Ractive from 'ractive';

import store from '../store.js';

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

function getCurrentTileIndex(state) {
  return state.get('currentTileSet').get('currentTileIndex');
}

export default function levelView() {
  return new Ractive({
    el: '[data-view]',
    template: '#levelView',
    oninit: function () {
      const levelId = store.getState().get('levels').get('currentLevelId');
      store.dispatch(fetchAndSelectLevel(levelId));
      store.dispatch(fetchAllTileSheets('/data/tile-sheets.json'));

      store.subscribe(() => {
        const levels = store
          .getState()
          .get('levels');

        const levelId = levels.get('currentLevelId');
        const items = levels.get('items');

        if (!items.size) {
          return;
        }
        
        this.set('description', items.get(levelId).get('description'));
        this.set('state', store.getState().toJS());
      });

      this.on('TileSelect.select', (event, tileIndex) => {
        store.dispatch(selectTile(tileIndex));
      });

      this.on('TileSheetSelect.select', (event) => {
        store.dispatch(selectTileSheet(event.context.id));
      });

      this.on('ToolSelect.select', (event, toolId) => {
        store.dispatch(selectedTool(toolId));
      });

      this.on('LayerSelect.select', (event, layerIndex) => {
        store.dispatch(selectLayer(layerIndex));
      });

      this.on('LayerSelect.toggle', (event, layerIndex) => {
        store.dispatch(toggleLayer(layerIndex, event.original.target.checked));
      });

      this.on('Layer.addTile', (mouseEvent) => {
        const tilePosition = getTilePosition(mouseEvent.offsetX, mouseEvent.offsetY, 400),
          tileIndex = getCurrentTileIndex(store.getState());

        store.dispatch(addTile(tilePosition, tileIndex));
      });

      this.on('Layer.removeTile', (mouseEvent) => {
        const tilePosition = getTilePosition(mouseEvent.offsetX, mouseEvent.offsetY, 400);
        store.dispatch(removeTile(tilePosition));
      });

      this.on('Layer.fillTiles', (mouseEvent) => {
        const tileIndex = getCurrentTileIndex(store.getState());
        store.dispatch(fillTilesWith(tileIndex));
      });
    }
  });
}
