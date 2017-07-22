import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VideoTimePipe } from '../../pipes/videotime.pipe';

@Component({
  selector: 'controls-component',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {

  @Input()
  duration: number

  @Input()
  currentTime: number

  @Input()
  currentTitle: string

  @Input()
  filterName: string

  @Output()
  playPause: EventEmitter<any> = new EventEmitter;

  @Output()
  addFilter: EventEmitter<any> = new EventEmitter;

  isPlaying: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  togglePlayPause(): void {
    this.isPlaying = !this.isPlaying
  }

  emitPlayPause(): void {
    this.playPause.emit(this.isPlaying)
  }

  toggleFilter(): void {
    this.addFilter.emit(true)
  }

}
