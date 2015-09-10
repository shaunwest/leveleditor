/**
 * Created by shaunwest on 8/22/15.
 */

import store from '../store.js';
import Ractive from 'ractive';

const BackgroundLayer = Ractive.extend({
  template: '#backgroundLayer',
  oninit: function () {
    store.subscribe(() => {
      const levelId = this.get('levelId');
      if (!levelId) {
        return;
      }

      const level = store.getState().levels.get('items').get(levelId);
      if (!level || !level.size) {
        return;
      }

      this.set('backgroundUrl', level.get('background').get('backgroundUrl'));
    });
  },
  data: function () {
    return {
      levelId: null,
      backgroundUrl: null
    };
  }
});

export default BackgroundLayer;