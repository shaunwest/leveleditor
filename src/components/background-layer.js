/**
 * Created by shaunwest on 8/22/15.
 */

import store from '../store.js';
import Ractive from 'ractive';

const BackgroundLayer = Ractive.extend({
  template: '#backgroundLayer',
  oninit: function () {
    store.subscribe(() => {
      const levelId = store.getState().levels.get('currentLevelId');
      if (!levelId) {
        return;
      }

      const level = store.getState().levels.getIn(['items', levelId]);
      if (!level || !level.size) {
        return;
      }

      this.set('backgroundUrl', level.getIn(['background', 'backgroundUrl']));
    });
  },
  data: function () {
    return {
      backgroundUrl: null
    };
  }
});

export default BackgroundLayer;