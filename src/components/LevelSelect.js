/**
 * Created by shaunwest on 8/22/15.
 */

import Ractive from 'ractive';

import store from '../store.js';

const LevelSelect = Ractive.extend({
  template: '#levelSelect',
  oninit: function () {
    store.subscribe(() => {
      const levels = store.getState().levels;

      levels.items.forEach((item, index) => {
        this.set(`levels[${index}].name`, levels.items[index].name);

        if (levels.items[index].thumbnail) {
          this.set(`levels[${index}].thumbnail`, levels.items[index].thumbnail);
        } else {
          this.set(`levels[${index}].thumbnail`, 'default_thumbnail.png');
        }
      });
    });
  },
  data: function () {
    return {
      levels: []
    };
  }
});

export default LevelSelect;