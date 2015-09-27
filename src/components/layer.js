/**
 * Created by shaunwest on 8/22/15.
 */

import Ractive from 'ractive';
import { addTile } from '../actions/layer.js';
import store from '../store/store.js';
import { getCurrentLevelId } from '../store/helpers.js';

const Layer = Ractive.extend({
  template: '#layer',
  oninit: function () {
    const currentLevelId = getCurrentLevelId();
    let isMouseDown = false;

    this.on('mouseDown', event => {
      isMouseDown = true; 
      // LayerCanvas automatically updates when state changes
    });

    this.on('mouseUp', event => {
      isMouseDown = false;
    });

    this.on('mouseMove', event => {
      if (!isMouseDown) {
        return;
      }
      const mouseEvent = event.original;
      console.log(mouseEvent.offsetX, mouseEvent.offsetY);

      store.dispatch(addTile(currentLevelId, 5, 1));
    });
  },
  oncomplete: function () {
    const canvas = this.find('canvas');

    store.subscribe(() => {
      const state = store.getState();
      // draw tiles 
    });
  },
  data: function () {
    return {
      layer: null
    };
  }
});

export default Layer;
