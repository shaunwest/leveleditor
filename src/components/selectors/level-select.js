/**
 * Created by shaunwest on 8/22/15.
 */

import Ractive from 'ractive';

const LevelSelect = Ractive.extend({
  template: '#levelSelect',
  oninit: function () {
    const store = this.get('store');

    store.subscribe(() => {
      const levels = store.getState().get('levels');
      const items = levels.get('items');

      if (!items.size) {
        return;
      }

      this.set('levels', Object.assign({}, this.get('levels'), items.toJS()));
    });
  },
  data: function () {
    return {
      levels: {} // replace with Map, use adaptor (?)
    };
  }
});

export default LevelSelect;
