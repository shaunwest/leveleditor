/**
 * Created by shaunwest on 8/19/15.
 */

//import 'babel-core/polyfill.js';

import Ractive from 'ractive';
import store from './store.js';

import { initRouting } from './modules/routes/routes-handle.js';

import './components/components.js';

import LevelSelectView from './containers/level-select-view.js';
import LevelEditView from './containers/level-edit-view.js';

Ractive.DEBUG = false;

const routes = [
  {
    path: '/',
    view: LevelSelectView
  },
  {
    path: '/level/:levelId',
    view: LevelEditView
  }
];

store.dispatch(initRouting(routes));
