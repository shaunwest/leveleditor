// TODO: rename to sequenceTypes


export function basic(tileSequence, targetFps, frameCount) {
  const basicSequence = tileSequence.frames.basic;
  const keyFrame = getKeyFrame(targetFps, basicSequence.fps || targetFps);
  return getSequenceTile(basicSequence.images, keyFrame, frameCount);
}

export function waitThenCycle(tileSequence, targetFps, frameCount) {
  const cycleSequence = tileSequence.frames.cycle;
  const every = frameCount % cycleSequence.every;

  if (every === 0) {
    tileSequence.cycling = true;
  }

  if (tileSequence.cycling) {
    const cycleImages = cycleSequence.images;
    const keyFrame = getKeyFrame(targetFps, cycleSequence.fps || targetFps);
    const index = getSequenceIndex(cycleImages.length + 1, keyFrame, frameCount);
    if (index === cycleImages.length) {
      tileSequence.cycling = false;
      return basic(tileSequence, targetFps, frameCount);
    } else {
      return cycleImages[index];
    }
  } else {
    return basic(tileSequence, targetFps, frameCount);
  }
}

function getKeyFrame(targetFps, sequenceFps) {
  return targetFps / sequenceFps;
}

function getSequenceTile(images, keyFrame, frameCount) {
  return (!images || !images.length) ?
    null : 
    images[getSequenceIndex(images.length, keyFrame, frameCount)];
}

function getSequenceIndex(sequenceLength, keyFrame, frameCount) {
  return (Math.floor(frameCount / keyFrame) % sequenceLength) || 0;
}
