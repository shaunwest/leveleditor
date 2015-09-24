/**
 * Created by shaunwest on 8/22/15.
 */

import store from '../store.js';
import Ractive from 'ractive';
import { selectLevel } from '../actions/levels.js';
import { navigateTo } from '../actions/routes.js';

const LevelSelect = Ractive.extend({
  template: '#levelSelect',
  oninit: function () {
    store.subscribe(() => {
      const levels = store.getState().levels;
      const items = levels.get('items');

      if (!items.size) {
        return;
      }

      this.set('levels', Object.assign({}, this.get('levels'), items.toJS()));
    });

    this.on('selectLevel', (event, levelId) => {
      store.dispatch(navigateTo('/level/' + levelId));
    });
  },
  data: function () {
    return {
      levels: {} // replace with Map, use adaptor (?)
    };
  }
});

export default LevelSelect;