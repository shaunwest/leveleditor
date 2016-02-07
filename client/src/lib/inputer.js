/**
 * Created by shaunwest on 11/27/15.
 */

import { point } from './util/geom.js';

export default function Inputer(targetElement, update, translator) {
  const values = {
    isPressed: false,
    isActive: false,
    position: null,
    initialPressPosition: null,
    lastPosition: null
  };

  const getPosition = (x, y) => (translator) ? translator(x, y, targetElement) : point(x, y);

  // PRESS
  targetElement.addEventListener('mousedown', event => {
    const mouseLocation = getPosition(event.clientX, event.clientY);

    values.isActive = true;
    values.position = values.initialPressPosition = mouseLocation;
    values.isPressed = true;

    update(values);
  });

  // RELEASE
  targetElement.addEventListener('mouseup', event => {
    const mouseLocation = getPosition(event.clientX, event.clientY);

    values.isActive = true;
    values.position = mouseLocation;
    values.isPressed = false;

    update(values);
  });

  // OUT
  targetElement.addEventListener('mouseout', event => {
    const mouseLocation = getPosition(event.clientX, event.clientY);

    values.isActive = false; 
    values.position = mouseLocation;
    //values.isPressed = false;
    
    update(values);
  });

  // DRAG && HOVER OVER
  targetElement.addEventListener('mousemove', event => {
    const mouseLocation = getPosition(event.clientX, event.clientY);
    values.isActive = true;
    values.lastPosition = (values.position || mouseLocation);
    values.position = mouseLocation;

    update(values);
  });
}
