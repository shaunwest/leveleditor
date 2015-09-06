/**
 * Created by shaunwest on 9/1/15.
 */

import store from '../store.js';
import Ractive from 'ractive';
import { Map } from 'immutable';
import { mapAdaptor } from '../adaptors.js';

const Provider = Ractive.extend({
  template: '{{>content}}',
  oninit: function () {
    const getData = this.get.bind(this),
      setData = this.set.bind(this);

    store.subscribe(function () {
      if (!getData('source')) {
        throw 'Provider requires a source.';
      }
      const source = store.getState()[getData('source')];
      const sourceData = (source.has('items')) ?
        source.get('items') :
        source;

      if (!sourceData) {
        return;
      }

      //this.set('data', Object.assign({}, this.get('data'), sourceData.toObject()));
      setData('data', getData('data').merge(sourceData));
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
