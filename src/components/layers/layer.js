/**
 * Created by shaunwest on 8/22/15.
 */

import React, { Component } from 'react';
import RenderPerf from '../debug/render-perf.js';
import tileRenderer from '../../lib/tile-renderer.js';

const TILE_SIZE = 16,
  MAX_TILE_FRAMES = 16,
  DISPLAY_SHOW = 'block',
  DISPLAY_HIDE = 'none',
  NOOP = function () {};

export default class Layer extends Component {
  componentDidMount() {
    /*const RENDER_LOOP = frame(),
      canvas = this.refs.canvas,
      context = canvas.getContext('2d');*/

    //let frameCount = 0;

    /*
    RENDER_LOOP((elapsed, fps, count) => {
      //const tileImages = this.props.tileImages.toJS(),
      //const tileData = this.props.tileData,
      const layer = this.props.layer;
      const width = layer.get('width');
      const height = layer.get('height');
      const tiles = layer.get('tiles').toArray();

      context.clearRect(0, 0, width, height);
      //drawTiles(context, tiles, tileImages, tileData, width, (frameCount === MAX_TILE_FRAMES) ? frameCount = 0 : frameCount++);
      //drawTiles(context, tiles, tileImages, tileData, width, fps, count);
      if (this.state.tiler) {
        this.state.tiler(tiles, fps, count);
      }
      return CONTINUE_RENDERING;
    });*/
  }

  render() {
    const layer = this.props.layer;
    const layerCanvas = this.refs.canvas;
    //const context = layerCanvas.getContext('2d');
    const tiles = layer.get('tiles').toArray();
    const width = layer.get('width');
    const height = layer.get('height');
    const _RENDER_LOOP = (layerCanvas) ? 
      tileRenderer(
        layerCanvas.getContext('2d'),
        tiles,
        TILE_SIZE,
        this.props.tileImages.toJS(),
        this.props.tileData,
        width,
        height) :
      NOOP;
    //this.tiler.update(this.props.tileImages.toJS(), this.props.tileData, Math.floor(width / TILE_SIZE));

    return (
      <div
        className="layerContainer"
        style={{ display: this.props.layer.get('visible') ? 'block' : 'none' }}>
        <canvas 
          className="layerCanvas"
          width={ width }
          height={ height }
          ref="canvas">
        </canvas>
      </div>
    );
  }
}

/*
function drawTiles(context, tiles, tileImages, tileData, width, fps, frameCount) {
  for(let i = 0; i < tiles.length; i++) {
    const tileIndex = tiles[i];

    if (typeof tileIndex === 'undefined') {
      continue;
    }

    const tileImageSequence = tileImages[tileIndex];

    if (!tileImageSequence || !tileImageSequence.length) {
      continue;
    }

    const widthInTiles = Math.floor(width / TILE_SIZE);
    const x = i % widthInTiles;
    const y = Math.floor(i / widthInTiles);

    drawTileSequence(context, tileImageSequence, tileData[tileIndex], x, y, fps, frameCount);
  }
}

function drawTileSequence(context, sequence, tileData, x, y, fps, frameCount) {
  const numImages = sequence.length;
  const keyFrame = Math.floor(fps / tileData.fps);
  //const sequenceIndex = frameCount % numImages;
  const sequenceIndex = (frameCount % keyFrame === 0) ? sequenceIndex + 1 : sequenceIndex; // ugghgghh
  const tileImage = sequence[sequenceIndex];

  drawTile(context, tileImage, x * TILE_SIZE, y * TILE_SIZE);
}

function drawTile(context, tileImage, x, y) {
  context.drawImage(tileImage, x, y);
}
*/
