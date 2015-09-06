/**
 * Created by shaunwest on 8/19/15.
 */

import store from './store.js';
import { fetchLevels, fetchLevel } from './actions.js';
import { Map } from 'immutable';
import Ractive from 'ractive';
import LevelSelect from './components/LevelSelect.js';
import Provider from './components/Provider.js';

const ractive = new Ractive({
  el: '[data-app]',
  template: '#levelSelectView',
  components: {
    LevelSelect: LevelSelect,
    Provider: Provider
  }
});

store.dispatch(fetchLevels('data/levels.json'))
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
