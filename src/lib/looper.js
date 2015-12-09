/**
 * Created by shaunwest on 6/20/15.
 */

// requestAnimationFrame automatically targets 60 FPS
export const TARGET_FPS = 60;
export const CONTINUE_RENDERING = true;

const MS_PER_SECOND = 1000;
const loopsData = new Map();

function getDeltaTime(now, lastUpdateTime) {
  return (now - lastUpdateTime) / MS_PER_SECOND;
}

export default function Looper(id) {
  const start = +new Date()
  let last = start, fps = 0, vFrameCount = 0, aFrameCount = 0;

  if (!id) {
    throw 'Looper: a loop id is required';
  }

  if (!loopsData.has(id)) {
    loopsData.set(id, {
      callbacks: [],
      started: false
    });
  } else {
    loopsData.get(id).callbacks.length = 0;
  }

  function loop() {
    let i = 0;
    // TODO: for perf don't use new
    const now = +new Date();
    const callbacks = loopsData.get(id).callbacks;
    const numCallbacks = callbacks.length;
    // FIXME: if the loop is suspended, totalElapsed will
    // grow out of sync with aFrameCount
    const totalElapsed = getDeltaTime(now, start);
    const elapsed = getDeltaTime(now, last);
    const fps = aFrameCount / totalElapsed; 

    while (i++ < numCallbacks) {
      const callback = callbacks.shift();
      if (callback(fps, elapsed, vFrameCount, aFrameCount)) {
        callbacks.push(callback);  
      }
    }

    if (!callbacks.length) {
      return;
    }

    aFrameCount++;

    if (fps) {
      vFrameCount += Math.round(TARGET_FPS / fps);
    }
    last = +new Date();
    requestAnimationFrame(loop);
  }

  function create(cb) {
    const loopData = loopsData.get(id);

    if (!cb) {
      loopsData.get(id).callbacks.length = 0;
      return create;
    }

    loopData.callbacks.push(cb);
    if (!loopData.started) {
      loop();
      loopData.started = true;
    }

    return create;
  }

  return create;
}
