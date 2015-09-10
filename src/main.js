/**
 * Created by shaunwest on 8/19/15.
 */

import Ractive from 'ractive';

import { setView } from './view.js';

import page from 'page';

import LevelSelect from './components/LevelSelect.js';
import LevelsProvider from './components/LevelsProvider.js';
import LevelProvider from './components/LevelProvider.js';
import BackgroundLayer from './components/BackgroundLayer.js';
import TileSheetSelect from './components/TileSheetSelect.js';

import LevelsController from './controllers/levels.js';
import LevelController from './controllers/level.js';
import TileSheetsController from './controllers/tile-sheets.js';

page('/', setView('#levelSelectView', {
  LevelSelect,
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
