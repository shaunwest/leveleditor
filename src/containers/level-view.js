/**
 * Created by shaunwest on 9/7/15.
 */

import Ractive from 'ractive';

import { fetchLevel, fetchAndSelectLevel } from '../modules/levels/fetch-levels.js';
import { selectTile, fetchAll as fetchAllTileSheets } from '../modules/tile-sheets/fetch-tile-sheets.js';

import Layers from './layers.js';

import Layer from '../components/layers/layer.js';
import TileSheetSelect from '../components/selectors/tile-sheet-select.js';
import TileSelect from '../components/selectors/tile-select.js';

export default function levelView(store) {
  return new Ractive({
    el: '[data-app]',
    template: '#levelView',
    components: {
      Layers,
      Layer,
      TileSheetSelect,
      TileSelect
    },
    data: {
      store
    },
    oninit: function () {
      const levelId = store
        .getState()
        .levels
        .get('currentLevelId');

      store.dispatch(fetchAndSelectLevel(levelId));
      store.dispatch(fetchAllTileSheets('/data/tile-sheets.json'));

      this.on('TileSelect.select', (event, tileIndex) => {
        store.dispatch(selectTile(tileIndex));
      });

      this.on('TileSheetSelect.select', (event) => {
        store.dispatch(selectTileSheet(event.context.id));
      });
    }
  });
}
