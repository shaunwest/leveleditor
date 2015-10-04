/**
 * Created by shaunwest on 6/20/15.
 */

const MS_PER_SECOND = 1000;

function getDeltaTime(now, lastUpdateTime) {
  return (now - lastUpdateTime) / MS_PER_SECOND;
}

// STATEFUL
function frameLoop(start) {
  let cbs = [], last = start, fps = 0, frameCount = 0;
  let intervalId = setInterval(function () {
    fps = frameCount;
    frameCount = 0;
  }, MS_PER_SECOND);

  (function loop() {
    frameCount++;

    cbs = cbs
      .map(function (cb) {
        return cb(fps, last) && cb;
      })
      .filter(function (cb) {
        return cb;
      });

    last = +new Date();
    requestAnimationFrame(loop);
  })();

  return function (cb) {
    cbs.push(cb);
  };
}

export default function frame() {
  const loop = frameLoop(+new Date());

  return function (cb) {
    loop(function (fps, lastUpdateTime) {
      const elapsed = getDeltaTime(+new Date(), lastUpdateTime);
      return cb(elapsed, fps);
    });
  }
}
