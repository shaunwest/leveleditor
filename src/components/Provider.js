/**
 * Created by shaunwest on 9/1/15.
 */

import store from '../store.js';
import Ractive from 'ractive';
import { Map } from 'immutable';

const mapAdaptor = {
  filter: function (object) {
    return object instanceof Map;
  },

  // If an object passes the filter, we wrap it.
  wrap: function (ractive, map, keypath, prefixer) {
    return {
      get: function () {
        return map.toObject();
      },
      set: function (property, value) {
        map.set(property, value);
        ractive.set(keypath, value);
      },
      teardown: function () {
        // immutable objects have no teardown (?)
      }
    }
  }
};

const Provider = Ractive.extend({
  template: '{{>content}}',
  oninit: function () {
    store.subscribe(() => {
      if (!this.get('source')) {
        throw 'Provider requires a source.';
      }
      const source = store.getState()[this.get('source')];
      const sourceData = (source.has('items')) ?
        source.get('items') :
        source;

      if (!sourceData) {
        return;
      }

      //this.set('data', Object.assign({}, this.get('data'), sourceData.toObject()));
      this.set('data', this.get('data').merge(sourceData));
    });
  },
  data: function () {
    return {
      source: null,
      data: Map()
    };
  },
  adapt: [
    mapAdaptor
  ]
});

export default Provider;
