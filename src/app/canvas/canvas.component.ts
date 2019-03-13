import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ConnectType, FigureDrawerService } from '../figure-drawer.service';

@Component({
  selector: 'ply-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {

  @Input() size: number;
  @Input() vertexNumber: number;
  @Input() connectType: ConnectType;
  @Input() distance: number;
  @ViewChild('canvas') canvas: ElementRef;
  ctx: CanvasRenderingContext2D;

  constructor(private drower: FigureDrawerService) { }

  ngAfterViewInit(): void {
    const canvasNe: HTMLCanvasElement = this.canvas.nativeElement;
    this.ctx = canvasNe.getContext('2d');

    this.drower.draw(this.ctx, {vertexNumber: this.vertexNumber, connectType: this.connectType, distance: this.distance});

  }

}
