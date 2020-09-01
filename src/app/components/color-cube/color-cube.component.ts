import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'color-cube',
  templateUrl: './color-cube.component.html',
  styleUrls: ['./color-cube.component.scss'],
})
export class ColorCubeComponent implements OnInit {
  @Input() colors: string[];
  @Input() active: boolean;
  
  constructor() { }

  ngOnInit() {}

}
