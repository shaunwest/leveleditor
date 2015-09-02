/**
 * Created by shaunwest on 8/22/15.
 */

import Ractive from 'ractive';

import store from '../store.js';
const LevelSelect = Ractive.extend({
  template: '#levelSelect',
  oninit: function () {
    store.subscribe(() => {
      const items = store.getState().levels.get('items');
      const sourceLevels = items;
      const destLevels =
        sourceLevels
        .reduce((dest, level, key) => {
          dest[key] = (level.thumbnail) ?
            { thumbnail: level.thumbnail } :
            { thumbnail: 'default-thumbnail.png' };
          return dest;
        }, {});

      this.set('levels', Object.assign({}, this.get('levels'), destLevels));
    });
  },
  data: function () {
    return {
      levels: {}
    };
  }
});

export default LevelSelect;