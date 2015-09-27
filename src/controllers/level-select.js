/**
 * Created by shaunwest on 9/7/15.
 */

import store from '../store/store.js';
import { fetchAll as fetchAllLevels } from '../actions/levels.js';

export default function levelSelectController() {
  store.dispatch(fetchAllLevels('/data/levels.json'));
}
