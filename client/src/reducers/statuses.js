/**
 * Created by shaunwest on 1/09/16.
 */

import { Map } from 'immutable';
import * as Status from '../constants/statuses.js';

export default function statuses(state = Map({
  tileImages: Status.NONE
}), action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
