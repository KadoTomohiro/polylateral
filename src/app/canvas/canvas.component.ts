import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ConnectType, FigureDrawerService } from '../figure-drawer.service';

@Component({
  selector: 'ply-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit, OnChanges {

  @Input() size: number;
  @Input() vertexNumber: number;
  @Input() connectType: ConnectType;
  @Input() distance: number;
  @ViewChild('canvas') canvas: ElementRef;
  ctx: CanvasRenderingContext2D;

  afterInit = false;

  constructor(private drawer: FigureDrawerService) { }

  ngAfterViewInit(): void {
    const canvasNe: HTMLCanvasElement = this.canvas.nativeElement;
    this.ctx = canvasNe.getContext('2d');
    this.draw();

    this.afterInit = true;
  }


  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (propName === 'size' && this.afterInit) {
        this.canvas.nativeElement.width = this.size;
        this.canvas.nativeElement.hight = this.size;
        this.draw();
      }
    }
  }

  private draw() {
    this.drawer.draw(this.ctx, {
      vertexNumber: this.vertexNumber,
      connectType: this.connectType,
      distance: this.distance
    });
  }

}
