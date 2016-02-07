/**
 * Created by shaunwest on 2/4/16.
 */

import React, { Component } from 'react';
import Canvas from '../renderers/canvas.js';

export default class TileEdit extends Component {
  render() {
    const tileImages = this.props.tileImages;

    if (!tileImages) {
      return (<ul></ul>);
    }

    const selectedTileId = this.props.selectedTileId;
    const tileImage = tileImages.get(selectedTileId);

    if (!tileImage) {
      return (<ul></ul>);
    }

    const frames = tileImage.get('frames');
    const width = tileImage.get('width');
    const height = tileImage.get('height');
    const scale = 4;

    return (
      <ul>
      {
        frames.map((frameSet, frameSetIndex) => {
          const images = frameSet.get('images');

          return (
            <li key={ frameSetIndex }>
            {
              images.map((image, imageIndex) => { 
                return (
                  <Canvas 
                    key={ imageIndex } 
                    image={ image } 
                    width={ width }
                    height={ height }
                    scale={ scale }
                  />
                );
              })
              .valueSeq()
            }
            </li>
          );
        })
        .valueSeq()
      }
      </ul>
    );
  }
}
