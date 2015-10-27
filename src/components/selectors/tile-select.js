/**
 * Created by shaunwest on 8/22/15.
 */

//import Ractive from 'ractive';
import React, { Component } from 'react';
import Canvas from '../canvas.js';

// TODO: fetching

export default class TileSelect extends Component {
  render() {
    const tileImages = this.props.tileImages;

    return (
      <ul>
      {
      tileImages
        .map((tileImage, index) => {
          return (
            <li key={ index } onClick={ e => this.props.onTileSelect(index) }><Canvas image={ tileImage.get(0) } /></li>
          );
        })
        .valueSeq()
      }
      </ul>
    );
  }
}


/*
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
*/
