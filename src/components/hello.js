/**
 * Created by shaunwest on 8/19/15.
 */

import template from '../template.js';
import Ractive from 'ractive';


Ractive.components.Bar = Ractive.extend({
  template: '<p>fooobar</p>',
  data: {
    message: 'No message specified, using the default',
    name: 'world!'
  }
});

template('./views/hello.html')
  .then(function (hello) {
    return Ractive.extend({
      template: hello,
      oninit: function () {
        this.on('activate', function () {
          alert('Activating!');
        });
      },
      data: {
        message: 'No message specified, using the default',
        name: 'world!'
      }
    });
  })
  .then(function (Foo) {
    /*var ractive = new Ractive({
      el: '[data-container]',
      template: '<Foo></Foo>',
      components: {
        Foo: Foo
      }
    });*/
    Ractive.components.Foo = Foo;

    var ractive = new Ractive({
      el: '[data-container]',
      template: '<Foo></Foo><Bar></Bar>'
    });
  });
