import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'mediaevents-component',
  templateUrl: './mediaevents.component.html',
  styleUrls: ['./mediaevents.component.scss']
})
export class MediaEventsComponent implements OnChanges {

  @Input()
  mediaEvents: any

  public title : string = 'Media Events'
  public subtitle : string = 'Various events are sent when handling media that is embedded in HTML documents using the <video> element.'

  constructor() { 
      
  }

  ngOnChanges(changes) {
    this.mediaEvents = Object.assign({}, changes.mediaEvents.currentValue)
  }

}
