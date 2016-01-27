
export function basic(sequence, targetFps, frameCount) {
  const basicSequence = sequence.frames.basic;
  const keyFrame = getKeyFrame(targetFps, basicSequence.fps || targetFps);
  return getSequenceImage(basicSequence.images, keyFrame, frameCount);
}

export function waitThenCycle(sequence, targetFps, frameCount) {
  const cycleSequence = sequence.frames.cycle;
  const every = frameCount % cycleSequence.every;

  if (every === 0) {
    sequence.cycling = true;
  }

  if (sequence.cycling) {
    const cycleImages = cycleSequence.images;
    const keyFrame = getKeyFrame(targetFps, cycleSequence.fps || targetFps);
    const index = getSequenceIndex(cycleImages.length + 1, keyFrame, frameCount);
    if (index === cycleImages.length) {
      sequence.cycling = false;
      return basic(sequence, targetFps, frameCount);
    } else {
      return cycleImages[index];
    }
  } else {
    return basic(sequence, targetFps, frameCount);
  }
}

function getKeyFrame(targetFps, sequenceFps) {
  return targetFps / sequenceFps;
}

function getSequenceImage(images, keyFrame, frameCount) {
  return (!images || !images.length) ?
    null : 
    images[getSequenceIndex(images.length, keyFrame, frameCount)];
}

function getSequenceIndex(sequenceLength, keyFrame, frameCount) {
  return (Math.floor(frameCount / keyFrame) % sequenceLength) || 0;
}
