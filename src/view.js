/**
 * Created by shaunwest on 9/6/15.
 */

import store from './store.js';
import Ractive from 'ractive';

export function getView(template, components, controllers = []) {
  return function (ctx, next) {
    controllers.forEach(controller => controller());

    return new Ractive({
      el: '[data-app]',
      template,
      components,
      data: {
        route: ctx,
        next: next
      }
    });
  };
}