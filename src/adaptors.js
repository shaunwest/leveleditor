/**
 * Created by shaunwest on 9/6/15.
 */

import { Map } from 'immutable';

export const mapAdaptor = {
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
        console.log(property, value);
        map.set(property, value);
        //ractive.set(keypath, value); // Is this needed??
      },
      teardown: function () {
        // immutable objects have no teardown (?)
      }
    }
  }
};

