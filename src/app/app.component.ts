import { Component } from '@angular/core';
import { Observable, range } from 'rxjs';
import { toArray } from 'rxjs/operators';

@Component({
  selector: 'ply-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  size = 100;
  vertexNumber = 8;

  vertexes: Observable<number[]>;
  constructor() {
    this.setVertexes();
  }

  distances(vertex: number, type: string) {
    const distances = [];
    const max = (type === 'vertexMidpoint') ? Math.ceil(vertex / 2) : Math.floor(vertex / 2);
    for (let i = 1; i <= max; i++) {
      distances.push(i);
    }
    return distances;
  }

  private setVertexes() {
    this.vertexes = range(3, this.vertexNumber - 3 + 1)
      .pipe(
        toArray()
      );
  }
}
