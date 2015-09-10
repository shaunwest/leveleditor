/**
 * Created by shaunwest on 9/7/15.
 */

import store from '../store.js';
import { fetchLevels, fetchLevel } from '../actions/levels.js';

export default function LevelsController(route) {
  store.dispatch(fetchLevels('/data/levels.json'))
    .then(() => {
      store
        .getState()
        .levels
        .get('items')
        .toSeq()
        .forEach((level, src) => {
          store.dispatch(fetchLevel(src));
        });
    });
}