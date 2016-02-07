/**
 * Created by shaunwest on 2/4/16.
 */

import React, { Component } from 'react';
import Canvas from '../renderers/canvas.js';

export default class TileSelect extends Component {
  render() {
    const tileImages = this.props.tileImages;

    return (<ul>{ getTiles(tileImages, this.props) }</ul>);
  }
}

function getTiles(tileImages, props) {
  if (!tileImages) {
    return (<li>...</li>);
  }

  return tileImages.map((tileImage, index) => {
    if (tileImage.get('isFetching')) { // FIXME: use statuses
      return (<li key={ index }>...</li>);
    } 

    const frames = tileImage.get('frames'),
      description = tileImage.get('description');

    return (
      <li key={ index }>
        <input
          type="radio"
          onChange={ e => props.onTileSelect(index) }
          checked={ props.selectedTileId === index }
        /> { description }
        <ul>
        {
          frames.map((frameSet, frameSetIndex) => {
            const images = frameSet.get('images');

            return (
              <li key={ frameSetIndex }>
              {
                images.map((image, imageIndex) => { 
                  return (<Canvas key={ imageIndex } image={ image } />);
                })
                .valueSeq()
              }
              </li>
            );
          })
          .valueSeq()
        }
        </ul>
      </li>
    );
  })
  .valueSeq();
}
