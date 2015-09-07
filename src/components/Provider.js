/**
 * Created by shaunwest on 9/6/15.
 */

import Ractive from 'ractive';
import { mapAdaptor } from '../adaptors.js';
import store from '../store.js';

const Provider = Ractive.extend({
  template: '{{>content}}',
  adapt: [
    mapAdaptor
  ],
  data: function () {
    return {
      store
    };
  }
});

export default Provider;