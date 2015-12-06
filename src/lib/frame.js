/**
 * Created by shaunwest on 6/20/15.
 */

const MS_PER_SECOND = 1000,
  TARGET_FPS = 60; // requestAnimationFrame automatically targets 60 FPS

const loopsData = {};

export const CONTINUE_RENDERING = true;

function getDeltaTime(now, lastUpdateTime) {
  return (now - lastUpdateTime) / MS_PER_SECOND;
}

export default function frame(id) {
  let intervalId, last = +new Date(), fps = 0, ticks = 0, vFrameCount = 0, aFrameCount = 0;

  if (!id) {
    throw 'frame(): a frame id is required';
  }

  if (!loopsData[id]) {
    loopsData[id] = {
      callbacks: new Map(),
      started: false
    };
  }

  loopsData[id].intervalId = setInterval(function () {
    fps = ticks;
    ticks = 0;
  }, MS_PER_SECOND);

  function loop() {
    //let i = 0;
    const callbacks = loopsData[id].callbacks;
    //const numCallbacks = callbacks.size;
    const elapsed = getDeltaTime(+new Date(), last);
    
    for (let [callbackName, callback] of callbacks.entries()) {
      if (!callback(fps, elapsed, vFrameCount, aFrameCount, ticks)) {
        callbacks.delete(callbackName);  
      }
    }

    if (!callbacks.size) {
      return;
    }

    /*
    while (i++ < numCallbacks) {
      let callback = callbacks.shift();
      if (callback(fps, elapsed, vFrameCount, ticks)) {
        callbacks.push(callback);
      }
    }

    if (!callbacks.length) {
      return;
    }
    */

    ticks++;
    aFrameCount++;
    if (fps) {
      vFrameCount += (TARGET_FPS / fps);
    }
    last = +new Date();
    requestAnimationFrame(loop);
  }

  function killAll() {
    loopsData[id].callbacks.clear();
    clearInterval(loopsData[id].intervalId);
  }

  // TODO: implement callbackId so this function
  // can be idempotent. 
  // Should it be a required param to reduce errors? Probably
  return function (cb, callbackId) {
    const loopData = loopsData[id];

    if (!callbackId) {
      throw 'frame(): a callback id is required.';
    }

    if (!cb) {
      killAll();
    }
    else {
      loopData.callbacks.set(callbackId, cb);
      if (!loopData.started) {
        loop();
        loopData.started = true;
      }
    }
  };
}

/*
export default function frame() {
  const loop = frameLoop(+new Date());

  return (cb) => {
    loop((fps, lastUpdateTime, vFrameCount, aFrameCount) => {
      const elapsed = getDeltaTime(+new Date(), lastUpdateTime);
      return cb(elapsed, fps, vFrameCount, aFrameCount);
    });
  }
}
*/
