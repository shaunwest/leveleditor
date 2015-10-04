/**
 * Created by shaunwest on 8/19/15.
 */

import 'babel-core/polyfill.js';

import Ractive from 'ractive';

import { initRouting } from './modules/routes/handle-routes.js';

import levelSelectView from './containers/level-select.js';
import levelView from './containers/level-view.js';

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

initRouting(routes);
