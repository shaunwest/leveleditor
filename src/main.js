/**
 * Created by shaunwest on 8/19/15.
 */

import 'babel-core/polyfill.js';

import Ractive from 'ractive';

import { initRouting } from './actions/routes.js';

import LevelSelect from './components/level-select.js';
import Layers from './components/layers.js';
import Layer from './components/layer.js';
import TileSheetSelect from './components/tile-sheet-select.js';
import TileSelect from './components/tile-select.js';

import LevelSelectController from './controllers/level-select.js';
import LevelViewController from './controllers/level-view.js';

const routes = [
  {
    path: '/',
    template: '#levelSelectView',
    components: {
      LevelSelect
    },
    controller: LevelSelectController
  },
  {
    path: '/level/:levelId',
    template: '#levelView',
    components: {
      Layers,
      Layer,
      TileSheetSelect,
      TileSelect
    },
    controller: LevelViewController
  }
];

initRouting(routes);
