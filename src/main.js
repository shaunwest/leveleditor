/**
 * Created by shaunwest on 8/19/15.
 */

import Ractive from 'ractive';

import { setView } from './view.js';

import page from 'page';

import LevelSelect from './components/LevelSelect.js';
import LevelsProvider from './components/LevelsProvider.js';
import LevelProvider from './components/LevelProvider.js';

page('/', setView('#levelSelectView', {
  LevelSelect,
  LevelsProvider
}));

page('/level/:levelId', setView('#levelView', {
  LevelProvider
}));

page();
