/**
 * Created by shaunwest on 8/19/15.
 */

import './styles/main.scss';

import store from './store.js';

import { initRouting } from './modules/routes/routes-handle.js';

import LevelSelectContainer from './components/levels/level-select-container.js';
import LevelEditContainer from './components/levels/level-edit-container.js';

const routes = [
  {
    path: '/',
    view: LevelSelectContainer
  },
  {
    path: '/level/:levelId',
    view: LevelEditContainer
  }
];

store.dispatch(initRouting(routes));
