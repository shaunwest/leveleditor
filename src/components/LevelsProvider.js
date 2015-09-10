/**
 * Created by shaunwest on 9/1/15.
 */

import { Map } from 'immutable';
import { fetchLevels, fetchLevel, selectLevel } from '../actions/levels.js';
import Provider from './Provider.js';

const LevelsProvider = Provider.extend({
  oninit: function () {
    const store = this.get('store');

    store.subscribe(() => {
      const source = store.getState().levels;
      const sourceData = (source.has('items')) ?
        source.get('items') :
        source;

      if (!sourceData.size) {
        return;
      }

      this.set('data', this.get('data').merge(sourceData));
    });

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

    this.on('LevelSelect.select', (event) => {
      store.dispatch(selectLevel(event.context.id));
    });
  },
  data: function () {
    return {
      data: Map()
    };
  }
});

export default LevelsProvider;
