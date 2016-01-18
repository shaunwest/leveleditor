/**
 * Created by shaunwest on 6/20/15.
 */

// requestAnimationFrame automatically targets 60 FPS
export const TARGET_FPS = 60;
export const CONTINUE_RENDERING = true;

const MS_PER_SECOND = 1000;

let foo = 0;

function getDeltaTime(now, lastUpdateTime) {
  return (now - lastUpdateTime) / MS_PER_SECOND;
}

export default function Looper() {
  const start = +new Date(), callbacks = new Map();
  let last = start, fps = 0, vFrameCount = 0, aFrameCount = 0;

  function loop() {
    // FIXME: for perf don't use new
    const now = +new Date();
    // FIXME: if the loop is suspended, totalElapsed will
    // grow out of sync with aFrameCount
    const totalElapsed = getDeltaTime(now, start);
    const elapsed = getDeltaTime(now, last);
    const fps = aFrameCount / totalElapsed; 

    for (const [callbackId, callback] of callbacks) {
      const result = callback(fps, elapsed, vFrameCount, aFrameCount);
      if (typeof result !== 'undefined') {
        callbacks.delete(callbackId);
      }
    }

    aFrameCount++;

    if (fps) {
      vFrameCount += Math.round(TARGET_FPS / fps);
    }
    last = +new Date();
    requestAnimationFrame(loop);
  }

  // start
  loop();

  return function create(id, cb) {
    callbacks.set(id, cb);
    return create;
  };
}
