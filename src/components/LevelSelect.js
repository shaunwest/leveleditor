/**
 * Created by shaunwest on 8/22/15.
 */

import store from '../store.js';
import Ractive from 'ractive';
import { selectLevel } from '../actions/levels.js';

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

    this.on('select', (event) => {
      store.dispatch(selectLevel(event.context.id));
    });
  },
  data: function () {
    return {
      levels: {}
    };
  }
});

export default LevelSelect;