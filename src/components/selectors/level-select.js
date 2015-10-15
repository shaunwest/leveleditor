/**
 * Created by shaunwest on 8/22/15.
 */

import Ractive from 'ractive';

const LevelSelect = Ractive.extend({
  template: '#levelSelect',
  data: function () {
    return {
      levels: {} // replace with Map, use adaptor (?)
    };
  }
});

export default LevelSelect;
