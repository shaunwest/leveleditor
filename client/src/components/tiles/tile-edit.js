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
                    draw={ (c, width, height) => draw(c, image, width, height) } 
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

function draw(canvas, image, width, height) {
  if (!canvas) {
    return;
  }

  const context = canvas.getContext('2d');
  context.imageSmoothingEnabled = false;
  context.drawImage(image, 0, 0, width, height);
}
