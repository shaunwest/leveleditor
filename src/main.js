/**
 * Created by shaunwest on 8/19/15.
 */

import store from './store.js';
import { fetchLevels } from './actions.js';
import Ractive from 'ractive';
import LevelSelect from './components/LevelSelect.js';

const ractive = new Ractive({
  el: '[data-app]',
  template: '#levelSelectView',
  components: {
    LevelSelect: LevelSelect
  }
});

store.dispatch(fetchLevels('data/levels.json'));
