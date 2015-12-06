/**
 * Created by shaunwest on 11/27/15.
 */

import getElementLocation from './get-element-location.js';
import { point } from './geom.js';

const EVENT_PRESS = 'eventPress',
  EVENT_HOVER_OVER = 'eventHoverOver',
  EVENT_DRAG = 'eventDrag',
  EVENT_OUT = 'eventOut',
  EVENT_RELEASE = 'eventRelease';

export default class Inputer {
  constructor(targetElement) {
    this.events = {};

    // PRESS
    targetElement.addEventListener('mousedown', event => {
      const mouseLocation = getMouseLocation(event.clientX, event.clientY, targetElement);

      this.active = true;
      this.pressLocation = mouseLocation;

      return this.fire(EVENT_PRESS, mouseLocation);
    });

    // RELEASE
    targetElement.addEventListener('mouseup', event => {
      const pressLocation = this.pressLocation;
      const mouseLocation = getMouseLocation(event.clientX, event.clientY, targetElement);

      this.active = true;
      this.pressLocation = null;

      return this.fire(EVENT_RELEASE, mouseLocation, pressLocation);
    });

    // OUT
    targetElement.addEventListener('mouseout', event => {
      const mouseLocation = getMouseLocation(event.clientX, event.clientY, targetElement);

      this.active = false; 
      this.pressLocation = null;

      return this.fire(EVENT_OUT, mouseLocation);
    });

    // DRAG && HOVER OVER
    targetElement.addEventListener('mousemove', event => {
      const lastLocation = this.lastLocation;
      const mouseLocation = getMouseLocation(event.clientX, event.clientY, targetElement);

      this.active = true;
      this.lastLocation = mouseLocation;

      if (this.pressLocation) {
        return this.fire(EVENT_DRAG, mouseLocation, lastLocation, this.pressLocation);
      }
      else {
        return this.fire(EVENT_HOVER_OVER, mouseLocation, lastLocation);
      }
    });
  }

  fire(eventName, ...data) {
    const result = (this.events[eventName]) ?
      this.events[eventName].apply(this, data) :
      undefined;

    if (this.sideEffectsFunc) {
      this.sideEffectsFunc.call(this, result, eventName);
    }
  }

  onPress(func) {
    this.events[EVENT_PRESS] = func;
    return this;
  }

  onHoverOver(func) {
    this.events[EVENT_HOVER_OVER] = func;
    return this;
  }

  onDrag(func) {
    this.events[EVENT_DRAG] = func;
    return this;
  }

  onRelease(func) {
    this.events[EVENT_RELEASE] = func;
    return this;
  }

  onOut(func) {
    this.events[EVENT_OUT] = func;
    return this;
  }

  HANDLE_SIDE_EFFECTS(func) {
    this.sideEffectsFunc = func;
  }

  isActive() {
    return this.active;
  }
}

function getMouseLocation(clientX, clientY, element) {
  const elementLocation = getElementLocation(element);
  return point(clientX - elementLocation.x, clientY - elementLocation.y);
}
