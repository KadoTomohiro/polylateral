import { Injectable } from '@angular/core';
import { Polygram } from './models/polygram';

export type ConnectType = 'vertex' | 'midpoint' | 'vertexMidpoint';
type PointSelector = (vertexes: Point[], midpoints: Point[], distance: number) => Line[];

export interface FigureOption {
  vertexNumber: number;
  distance: number;
  connectType: ConnectType;
}

export interface Point {
  x: number;
  y: number;
}

export interface Line {
  start: Point;
  end: Point;
}

export interface Size {
  width: number;
  height: number;
}

@Injectable({
  providedIn: 'root'
})
export class FigureDrawerService {


  constructor() {
  }

  private pointSelector: {[k: string]: PointSelector} = {
    vertex: (vertexes: Point[], midpoints: Point[], distance: number) => {
      const lines: Line[] = [];
      vertexes.forEach((vertex, i, array) => {
        lines.push({
          start: vertex,
          end: array[this.getNextPointIndex(i, array.length, distance)]
        });
      });
      return lines;
    },
    midpoint: (vertexes: Point[], midpoints: Point[], distance: number) => {
      const lines: Line[] = [];
      midpoints.forEach((midpoint, i, array) => {
        lines.push({
          start: midpoint,
          end: array[this.getNextPointIndex(i, array.length, distance)]
        });
      });
      return lines;
    },
    vertexMidpoint: (vertexes: Point[], midpoints: Point[], distance: number) => {
      const lines: Line[] = [];
      vertexes.forEach((vertex, i, array) => {
        lines.push({
          start: vertex,
          end: midpoints[this.getNextPointIndex(i, array.length, distance - 1)]
        });
      });
      midpoints.forEach((midpoint, i, array) => {
        lines.push({
          start: midpoint,
          end: vertexes[this.getNextPointIndex(i, array.length, distance)]
        });
      });
      return lines;
    }
  };

  draw(ctx: CanvasRenderingContext2D, option: FigureOption) {

    const canvasSize: Size = this.getCanvasSize(ctx);
    const center: Point = this.getCanvasCenter(canvasSize);
    const radius = this.getRadius(canvasSize);
    // const originPoint: Point = this.reverse(this.getFigureOrigin(canvasSize, center), canvasSize);

    const polygram = new Polygram(option.vertexNumber, center, radius);

    const vertexes: Point[] = polygram.vertexes;
    const midpoints = this.getMidPoints(vertexes);

    const lines: Line[] = this.pointSelector[option.connectType.toString()](vertexes, midpoints, option.distance);

    // this.drawCircle(ctx, center, this.getRadius(canvasSize));
    // this.drawPath(ctx, vertexes);
    // this.drawPath(ctx, midpoints);
    this.drawLines(ctx, lines);


  }


  private drawPath(ctx: CanvasRenderingContext2D, points: Point[]) {
    ctx.beginPath();
    ctx.strokeStyle = '#eee';
    points.forEach(vertex => {
      ctx.lineTo(vertex.x, vertex.y);
    });
    ctx.closePath();

    ctx.stroke();
  }

  private drawCircle(ctx: CanvasRenderingContext2D, center: Point, radius: number) {
    ctx.strokeStyle = '#eee';
    ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }


  private drawLines(ctx: CanvasRenderingContext2D, lines: Line[]) {
    const canvasSize: Size = this.getCanvasSize(ctx);

    ctx.strokeStyle = '#000';

    lines.forEach(line => {
      const reversed = {
        start: this.reverse(line.start, canvasSize),
        end: this.reverse(line.end, canvasSize),
      };
      ctx.beginPath();
      ctx.moveTo(reversed.start.x, reversed.start.y);
      ctx.lineTo(reversed.end.x, reversed.end.y);
      ctx.stroke();
    });
  }

  private getMidPoints(vertexes: Point[]): Point[] {
    const midpoints: Point[] = [];

    for (let i = 0; i < vertexes.length; i++) {
      const midPoint: Point = this.getMidPoint({
        start: vertexes[i],
        end: vertexes[this.getNextPointIndex(i, vertexes.length)]
      });
      midpoints.push(midPoint);
    }
    return midpoints;
  }

  private getNextPointIndex(i: number, length: number, distance = 1) {
    return (i + distance) % length;
  }

  private getCanvasSize(ctx: CanvasRenderingContext2D) {
    return {
      width: ctx.canvas.width,
      height: ctx.canvas.height
    };
  }


  private getRadius(canvasSize: Size) {
    const radiusRate = 0.475;
    return canvasSize.width < canvasSize.height ? canvasSize.width * radiusRate : canvasSize.height * radiusRate;
  }

  private getCanvasCenter(canvasSize: Size) {
    return {
      x: (canvasSize.width / 2),
      y: (canvasSize.height / 2)
    };
  }

  private getMidPoint(line: Line): Point {
    return {
      x: (line.start.x + line.end.x) / 2,
      y: (line.start.y + line.end.y) / 2,
    };
  }

  private reverse(point: Point, canvasSize: Size): Point {
    return {
      x: point.x,
      y: canvasSize.height - point.y
    };
  }
}
