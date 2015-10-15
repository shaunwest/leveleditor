/**
 * Created by shaunwest on 8/22/15.
 */

import Ractive from 'ractive';

export default Ractive.extend({
  template: '#layerSelect',
  data: function () {
    return { 
      layers: null
    };
  }
});
