/**
 * Created by shaunwest on 8/22/15.
 */

import Ractive from 'ractive';

export default Ractive.extend({
  template: '#tileSheetSelect',
  data: function () {
    return {
      tileSheets: []
    };
  }
});
