import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ply-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  @Input() size: number;
  constructor() { }

  ngOnInit() {
  }

}
