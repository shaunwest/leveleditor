/**
 * Created by shaunwest on 8/22/15.
 */

import Ractive from 'ractive';

export default Ractive.extend({
  template: '#tileSheetSelect',
  oninit: function () {
    const store = this.get('store');

    store.subscribe(() => {
      const tileSheets = store.getState().tileSheets.get('items');

      if (!tileSheets.size) {
        return;
      }

      this.set('tileSheets', Object.assign({}, this.get('tileSheets'), tileSheets.toJS()));
    });
  },
  data: function () {
    return {
      tileSheets: {}
    };
  }
});
