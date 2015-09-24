/**
 * Created by shaunwest on 8/19/15.
 */

import 'babel-core/polyfill.js';

import Ractive from 'ractive';

import { initRouting } from './actions/routes.js';

import LevelSelect from './components/level-select.js';
import BackgroundLayer from './components/background-layer.js';
import TileSheetSelect from './components/tile-sheet-select.js';
import TileSelect from './components/tile-select.js';

import LevelsController from './controllers/levels.js';
import LevelController from './controllers/level.js';
import TileSheetsController from './controllers/tile-sheets.js';
import CanvasImage from './components/canvas-image.js';

const routes = [
  {
    path: '/',
    template: '#levelSelectView',
    components: {
      LevelSelect
    },
    controllers: [
      LevelsController
    ]
  },
  {
    path: '/level/:levelId',
    template: '#levelView',
    components: {
      BackgroundLayer,
      TileSheetSelect,
      TileSelect,
			CanvasImage
    },
    controllers: [
      LevelController,
      TileSheetsController
    ]
  }
];

initRouting(routes);
