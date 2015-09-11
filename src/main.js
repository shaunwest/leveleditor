/**
 * Created by shaunwest on 8/19/15.
 */

import Ractive from 'ractive';

//import { setView } from './view.js';

//import page from 'page';
import { addRoute, initRouting } from './actions/routes.js';

import LevelSelect from './components/level-select.js';
import BackgroundLayer from './components/background-layer.js';
import TileSheetSelect from './components/tile-sheet-select.js';

import LevelsController from './controllers/levels.js';
import LevelController from './controllers/level.js';
import TileSheetsController from './controllers/tile-sheets.js';

/*
page('/', setView('#levelSelectView', {
  LevelSelect
}, [
  LevelsController
]));

page('/level/:levelId', setView('#levelView', {
  BackgroundLayer,
  TileSheetSelect
}, [
  LevelController,
  TileSheetsController
]));

page();
*/

addRoute('/', {
  template: '#levelSelectView',
  components: {
    LevelSelect
  },
  controllers: [
    LevelsController
  ]
});

addRoute('/level/:levelId', {
  template: '#levelView',
  components: {
    BackgroundLayer,
    TileSheetSelect
  },
  controllers: [
    LevelController,
    TileSheetsController
  ]
});

initRouting();
