import { Component, OnInit, Input } from '@angular/core';
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'progress-component',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  @Input()
  percent: number = 0
 
  constructor() { }

  ngOnInit() {
 
  }

}
