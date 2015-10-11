/**
 * Created by shaunwest on 8/22/15.
 */

import Ractive from 'ractive';

export default Ractive.extend({
  template: '#layerSelect',
  oninit: function () {
    /*
    this.observe('state', (state) => {
      if (!state) {
        return;
      }

      const layers = state.layers;
      const items = layers.items;

      if (!items.length) {
        return;
      }

      this.set('layers', items);
    });
    */
    this.observe('layers', (layers) => {
      if (!layers) {
        return;
      }

      const items = layers.items;

      if (!items.length) {
        return;
      }

      this.set('layers', items);
    });
  },
  data: function () {
    return { 
      layers: null
    };
  }
});
