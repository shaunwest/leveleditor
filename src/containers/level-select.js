/**
 * Created by shaunwest on 9/7/15.
 */

import Ractive from 'ractive';
import store from '../store.js';
import { fetchAll as fetchAllLevels } from '../modules/levels/levels-fetch.js';
import { navigateTo } from '../modules/routes/routes-handle.js';

export default function levelSelectView() {
  return new Ractive({
    el: '[data-view]',
    template: '#levelSelectView',
    oninit: function () {
      store.dispatch(fetchAllLevels('/data/levels.json'));

      this.on('LevelSelect.select', (event, levelId) => {
        store.dispatch(navigateTo('/level/' + levelId));
      });

      store.subscribe(() => {
        this.set('state', store.getState().toJS());
      });
    }
  });
}
