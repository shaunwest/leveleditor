/**
 * Created by shaunwest on 9/7/15.
 */

import Ractive from 'ractive';
import { fetchAll as fetchAllLevels } from '../modules/levels/levels-fetch.js';
import { navigateTo } from '../modules/routes/routes-handle.js';
import LevelSelect from '../components/selectors/level-select.js';

export default function levelSelectView(store) {
  return new Ractive({
    el: '[data-view]',
    template: '#levelSelectView',
    components: {
      LevelSelect
    },
    data: {
      store
    },
    oninit: function () {
      store.dispatch(fetchAllLevels('/data/levels.json'));

      this.on('LevelSelect.select', (event, levelId) => {
        store.dispatch(navigateTo('/level/' + levelId));
      });
    }
  });
}
