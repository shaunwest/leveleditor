/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';
import Canvas from '../../lib/canvas.js';

export default class TileSelect extends Component {
  render() {
    const tileImages = this.props.tileImages;

    return (
      <ul>
      {
      tileImages
        .map((tileImage, index) => {
          const image = tileImage.get('frames').get('basic').get('images').get(0); 

          return (tileImage.get('isFetching')) ?
            (<li key={ index }>...</li>) :
            (
              <li key={ index }>
                <input
                  type="radio"
                  onChange={ e => this.props.onTileSelect(index) }
                  checked={ this.props.selectedTileId === index }
                /> <Canvas image={ image } />
              </li>
            );
        })
        .valueSeq()
      }
      </ul>
    );
  }
}
