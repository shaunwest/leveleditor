/**
 * Created by shaunwest on 8/19/15.
 */

//import 'babel-core/polyfill.js';

import Ractive from 'ractive';
import store from './store.js';

import { initRouting } from './modules/routes/routes-handle.js';

import './components/components.js';

import levelSelectView from './containers/level-select.js';
import levelView from './containers/level-view.js';

Ractive.DEBUG = false;

const routes = [
  {
    path: '/',
    view: levelSelectView
  },
  {
    path: '/level/:levelId',
    view: levelView
  }
];

store.dispatch(initRouting(routes));
