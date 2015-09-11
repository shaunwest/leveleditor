/**
 * Created by shaunwest on 9/7/15.
 */

import store from '../store.js';
import { fetchLevel } from '../actions/levels.js';

export default function LevelController() {
  //store.dispatch(fetchLevel(route.params.levelId));
  const context = store.getState().routes.get('context');
  console.log('level controller');
  if (!context.size) {
    return;
  }
  store.dispatch(fetchLevel(context.get('params').get('levelId')));
}

