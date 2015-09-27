/**
 * Created by shaunwest on 9/26/15.
 */

import Ractive from 'ractive';

const LayerCanvas = Ractive.extend({
  template: '<canvas width="300" height="300"></canvas>',
  oncomplete: function () {
    const canvas = this.find('canvas');
    console.log('fooo', canvas);
  },
  data: function () {
    return {
    };
  }
});

export default LayerCanvas;
