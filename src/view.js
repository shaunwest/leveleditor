/**
 * Created by shaunwest on 9/6/15.
 */

import store from './store/store.js';
import Ractive from 'ractive';

export function getView(template, components, controller) {
  return function () {
    if (typeof controller === 'function') {
      controller();
    }

    return new Ractive({
      el: '[data-app]',
      template,
      components,
      data: {
        store
      }
    });
  };
}
