import { Point } from './figure-drawer.service';

export class MathUtils {
  static fullAngle = Math.PI * 2;

  static rotation(originalPoint: Point, angle: number, center: Point = {x: 0, y: 0}): Point {

    const radiusX = originalPoint.x - center.x;
    const radiusY = originalPoint.y - center.y;

    return {
      x: radiusX * Math.cos(angle) - radiusY * Math.sin(angle) + center.x,
      y: radiusX * Math.sin(angle) - radiusY * Math.cos(angle) + center.y,
    };
  }

  static translationalMotion(originalPoint: Point, movement: Point): Point {
    return {
      x: originalPoint.x + movement.x,
      y: originalPoint.y + movement.y
    };
  }



}
