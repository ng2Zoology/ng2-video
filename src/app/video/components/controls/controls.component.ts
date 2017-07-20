import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'controls-component',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  @Input()
  currentTime: number

  constructor() { }

  ngOnInit() {

  }

}
