/**
 * Created by shaunwest on 8/22/15.
 */

import Ractive from 'ractive';

const BackgroundLayer = Ractive.extend({
  template: '#backgroundLayer',
  data: function () {
    return {
      background: {}
    };
  }
});

export default BackgroundLayer;