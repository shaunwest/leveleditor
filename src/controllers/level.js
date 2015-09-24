/**
 * Created by shaunwest on 9/7/15.
 */

import store from '../store.js';
import { fetchLevel } from '../actions/levels.js';

export default function LevelController() {
  const levelId = store.getState().levels.get('currentLevelId');
  store.dispatch(fetchLevel(levelId));
}

