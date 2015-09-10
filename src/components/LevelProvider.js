/**
 * Created by shaunwest on 9/1/15.
 */

import { Map } from 'immutable';
import { fetchLevel } from '../actions/levels.js';
import Provider from './Provider.js';

const LevelProvider = Provider.extend({
  oninit: function () {
    const store = this.get('store'),
      src = this.get('src');

    store.subscribe(() => {
      const levels = store.getState().levels;
      const items = (levels.has('items')) ?
        levels.get('items') :
        levels;

      if (!items.size) {
        return;
      }

      this.set('levelProvider', this.get('levelProvider').merge(items.get(src)));
    });

    store.dispatch(fetchLevel(src));
  },
  data: function () {
    return {
      src: null,
      levelProvider: Map()
    };
  }
});

export default LevelProvider;
