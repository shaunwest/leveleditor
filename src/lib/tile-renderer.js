/**
 * Created by shaunwest on 11/29/15.
 */

import Looper, { CONTINUE_RENDERING } from './looper.js';

const LOOP_ID = 'tileRenderer';

export default function tileRenderer (context, tiles, tileSize, tileImages, tileData, width, height) {
  const tileFrameIndexes = [];
  const _RENDER_LOOP = Looper(width);
  const widthInTiles = Math.floor(width / tileSize);

  return _RENDER_LOOP((fps, elapsed, vFrameCount, aFrameCount) => {
    context.clearRect(0, 0, width, height);
    const currentTiles = getCurrentTiles(tileImages, tileData, vFrameCount);
    drawTiles(context, tiles, currentTiles, widthInTiles, tileSize);

    return CONTINUE_RENDERING;
  });
}

function getCurrentTiles(tileImageSequences, tileImageSequencesData, frameCount) {
  const tiles = [];
  const numSequences = tileImageSequences.length;

  for (let i = 0; i < numSequences; i++) {
    const tileImageSequence = tileImageSequences[i];
    const sequenceFps = tileImageSequencesData[i].fps || 60;
    const tileImage = (!tileImageSequence || !tileImageSequence.length) ?
      null : 
      tileImageSequence[getSequenceIndex(tileImageSequence.length, 60 / sequenceFps, frameCount)];

    tiles.push(tileImage);
  }

  return tiles;
}

function getSequenceIndex(sequenceLength, keyFrame, frameCount) {
  return (Math.floor(frameCount / keyFrame) % sequenceLength) || 0;
}

/*
function getSequenceIndex(sequence, index) {
  //let sequenceIndex = this.tileFrameIndexes[tileIndex] || 0;
  let sequenceIndex = 0; //??

  const numImages = sequence.length;
  //const sequenceIndex = frameCount % numImages;
  sequenceIndex = (frameCount % keyFrame === 0) ? sequenceIndex + 1 : sequenceIndex;
  if (sequenceIndex >= numImages) {
    sequenceIndex = 0;
  }

  return sequenceIndex;
}
*/

function drawTiles(context, mapTiles, tileSet, widthInTiles, tileSize) {
  const numMapTiles = mapTiles.length;

  for(let i = 0; i < numMapTiles; i++) {
    const tileSetIndex = mapTiles[i];

    if (typeof tileSetIndex === 'undefined') {
      continue;
    }

    const tileImage = tileSet[tileSetIndex];

    if (!tileImage) {
      continue;
    }

    const x = i % widthInTiles;
    const y = Math.floor(i / widthInTiles);

    drawTile(context, tileImage, x * tileSize, y * tileSize);
  }
}

/*
// FIXME: ARGH! Sequence calculations need to be made per tile TYPE! Not per tile!!!
function drawTileSequence(sequence, tileIndex, x, y, fps, frameCount) {
  const tileData = this.tileData[tileIndex];
  let sequenceIndex = this.tileFrameIndexes[tileIndex] || 0;
  const numImages = sequence.length;
  const keyFrame = Math.floor(fps / tileData.fps);
  //const sequenceIndex = frameCount % numImages;
  sequenceIndex = (frameCount % keyFrame === 0) ? sequenceIndex + 1 : sequenceIndex;
  if (sequenceIndex >= numImages) {
    sequenceIndex = 0;
  }
  this.tileFrameIndexes[tileIndex] = sequenceIndex;
  const tileImage = sequence[sequenceIndex];

  this.drawTile(tileImage, x * this.tileSize, y * this.tileSize);
}
*/

function drawTile(context, tileImage, x, y) {
  context.drawImage(tileImage, x, y);
}
