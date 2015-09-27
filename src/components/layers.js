/**
 * Created by shaunwest on 8/22/15.
 */

import store from '../store/store.js';
import Ractive from 'ractive';

const Layers = Ractive.extend({
  template: '#layers',
  oninit: function () {
    store.subscribe(() => {
      const state = store.getState(),
        levels = state.levels,
        levelId = levels.get('currentLevelId');

      if (!levelId) {
        return;
      }

      const level = levels.getIn(['items', levelId]);
      if (!level || !level.size) {
        return;
      }

      this.set('layers', level.get('layers').toJS());
    });
  },
  data: function () {
    return {
      layers: null
    };
  }
});

export default Layers;
