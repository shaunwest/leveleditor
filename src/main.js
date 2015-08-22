/**
 * Created by shaunwest on 8/19/15.
 */
import Ractive from 'ractive';
//import hello from './components/hello.js';

Ractive.components.BackgroundLayer = Ractive.extend({
  template: '#backgroundLayer',
  data: {
    message: 'Hello, Foobar'
  }
});

var ractive = new Ractive({
  el: '[data-app]',
  template: '#editor'
});
