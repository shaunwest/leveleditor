/**
 * Created by shaunwest on 6/20/15.
 */

// requestAnimationFrame automatically targets 60 FPS
export const TARGET_FPS = 60;
export const CONTINUE_RENDERING = true;

const MS_PER_SECOND = 1000;

function getDeltaTime(now, lastUpdateTime) {
  return (now - lastUpdateTime) / MS_PER_SECOND;
}

export default function Looper() {
  const start = +new Date(), callbacks = [];
  let started = false, last = start, fps = 0, vFrameCount = 0, aFrameCount = 0;

  function loop() {
    let i = 0;
    // FIXME: for perf don't use new
    const now = +new Date();
    const numCallbacks = callbacks.length;
    // FIXME: if the loop is suspended, totalElapsed will
    // grow out of sync with aFrameCount
    const totalElapsed = getDeltaTime(now, start);
    const elapsed = getDeltaTime(now, last);
    const fps = aFrameCount / totalElapsed; 

    while (i++ < numCallbacks) {
      const callback = callbacks.shift();
      const result = callback(fps, elapsed, vFrameCount, aFrameCount);
      if (typeof result === 'undefined') {
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

  return function create(cb) {
    if (!cb) {
      callbacks.length = 0;
      return create;
    }

    callbacks.push(cb);
    if (!started) {
      loop();
      started = true;
    }

    return create;
  };
}
