/**
 * Created by shaunwest on 11/27/15.
 */

import getElementLocation from './get-element-location.js';
import { point } from './geom.js';

export default class Inputer {
  constructor(targetElement) {
    this.values = {
      isPressed: false,
      isActive: false,
      //isHovering: false,
      isDragging: false,
      activePressPosition: null,
      position: null,
      lastPosition: null
    };
    this.cb = () => {};

    // PRESS
    targetElement.addEventListener('mousedown', event => {
      const values = this.values;
      const mouseLocation = getMouseLocation(event.clientX, event.clientY, targetElement);

      values.isActive = true;
      values.activePressPosition = values.position = mouseLocation;
      values.isPressed = true;

      this.cb(values);
    });

    // RELEASE
    targetElement.addEventListener('mouseup', event => {
      const values = this.values;
      const mouseLocation = getMouseLocation(event.clientX, event.clientY, targetElement);

      values.isActive = true;
      values.activePressPosition = null;
      values.position = mouseLocation;
      values.isPressed = false;

      this.cb(values);
    });

    // OUT
    targetElement.addEventListener('mouseout', event => {
      const values = this.values;
      const mouseLocation = getMouseLocation(event.clientX, event.clientY, targetElement);

      values.isActive = false; 
      values.position = null;
      //values.isHovering = false;
      // TODO: should activePressPosition be cleared?

      this.cb(values);
    });

    // DRAG && HOVER OVER
    targetElement.addEventListener('mousemove', event => {
      const values = this.values;
      const mouseLocation = getMouseLocation(event.clientX, event.clientY, targetElement);

      values.isActive = true;
      values.lastPosition = (values.position || mouseLocation);
      values.position = mouseLocation;

      if (values.activePressPosition) {
        values.isDragging = true;
        //values.isHovering = false;
      }
      else {
        //values.isHovering = true;
        values.isDragging = false;
      }

      this.cb(values);
    });
  }

  onUpdate(cb) {
    this.cb = cb;
  }
}

function getMouseLocation(clientX, clientY, element) {
  const elementLocation = getElementLocation(element);
  return point(clientX - elementLocation.x, clientY - elementLocation.y);
}
