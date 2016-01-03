/**
 * Created by shaunwest on 12/01/15.
 */

import React, { Component } from 'react';
import { CONTINUE_RENDERING } from '../../lib/looper.js';

export default class RenderPerf extends Component {
  render() {
    this.props.renderFunction((fps, elapsed, vFrameCount, aFrameCount, ticks) => {
      this.refs.fps.innerHTML = fps;
      this.refs.elapsed.innerHTML = elapsed;
      this.refs.vFrameCount.innerHTML = Math.floor(vFrameCount);
      this.refs.aFrameCount.innerHTML = aFrameCount;

      return CONTINUE_RENDERING;
    });

    return (
      <ul className="perf">
        <li><span>FPS:</span> <span ref="fps"></span></li>
        <li><span>VFr:</span> <span ref="vFrameCount"></span></li>
        <li><span>AFr:</span> <span ref="aFrameCount"></span></li>
        <li><span>FrL:</span> <span ref="elapsed"></span></li>
      </ul>
    );
  }
}
