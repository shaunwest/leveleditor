/**
 * Created by shaunwest on 11/24/15.
 */

export function drawRect(context, rect, strokeStyle, fillStyle) {
  context.beginPath();

  if (strokeStyle) {
    context.strokeStyle = strokeStyle;
  }

  if (fillStyle) {
    context.fillStyle = fillStyle;
    context.fillRect(rect.x, rect.y, rect.width, rect.height);
  }

  context.rect(rect.x, rect.y, rect.width, rect.height);
  context.stroke();
  context.closePath();
}
