/**
 * Created by shaunwest on 9/7/15.
 */

import Ractive from 'ractive';

import { fetchLevel, fetchAndSelectLevel } from '../modules/levels/levels-fetch.js';
import { selectTileSheet, selectTile, fetchAll as fetchAllTileSheets } from '../modules/tile-sheets/fetch-tile-sheets.js';
import { selectedTool } from '../modules/tools/select-tools.js';
import { selectLayer, toggleLayer } from '../modules/layers/layers-actions.js';

import Layers from './layers.js';

import Layer from '../components/layers/layer.js';
import TileSheetSelect from '../components/selectors/tile-sheet-select.js';
import TileSelect from '../components/selectors/tile-select.js';
import ToolSelect from '../components/selectors/tool-select.js';
import LayerSelect from '../components/selectors/layer-select.js';

export default function levelView(store) {
  return new Ractive({
    el: '[data-view]',
    template: '#levelView',
    components: {
      Layers,
      Layer,
      TileSheetSelect,
      TileSelect,
      ToolSelect,
      LayerSelect
    },
    data: {
      store
    },
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
    }
  });
}
