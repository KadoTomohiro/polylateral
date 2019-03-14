import { Point, Size } from '../figure-drawer.service';
import { MathUtils } from '../math-utils';


export class Polygram {


  vertexes: Point[];
  constructor(public vertexNumber: number, public center: Point, public radius: number) {
    this.vertexes = this.getVertexes();
  }

  private getVertexes() {

    const vertexes: Point[] = [];
    const originPoint = this.getVertexOrigin();

    for (let i = 0; i < this.vertexNumber; i++) {
      vertexes.push(MathUtils.rotation(originPoint, this.getAngle(i), this.center));
    }
    return vertexes;
  }

  private getAngle(i: number) {
    return MathUtils.fullAngle / this.vertexNumber * i;
  }

  private getVertexOrigin(): Point {
    return MathUtils.translationalMotion(this.center, {x: 0, y: -this.radius});
  }
}
