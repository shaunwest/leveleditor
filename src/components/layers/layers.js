/**
 * Created by shaunwest on 8/22/15.
 */

import Ractive from 'ractive';

export default Ractive.extend({
  template: '#layers',
  data: function () {
    return {
      tileImages: [],
      layers: [],
      width: 400,
      toolId: null
    };
  }
});
