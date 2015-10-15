/**
 * Created by shaunwest on 8/22/15.
 */

import Ractive from 'ractive';

export default Ractive.extend({
  template: '#tileSelect',
  oninit: function () {
    this.observe('tileImages', tileImages => {
      const dataUrls = Object.keys(tileImages)
        .map(function (key) {
          return tileImages[key];
        })
        .map(function (tileImageSet) {
          return { 
            tiles: tileImageSet.map(function (tileImage) {
              return tileImage.toDataURL();
            })
          };
        });

      this.set('tileImageUrls', dataUrls);
    });
  },
  data: function () {
    return {
      tileImages: []
    };
  }
});
