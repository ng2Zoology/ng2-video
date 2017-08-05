import { Component, ViewChild, EventEmitter, ViewEncapsulation } from '@angular/core'
import { OnInit, Input, Output, OnChanges, AfterViewInit } from '@angular/core'

// components
import { VideoComponent } from './components/video/video.component'
import { MediaEventsComponent } from './components/mediaevents/mediaevents.component'
import { MediaPropertiesComponent } from './components/mediaproperties/mediaproperties.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent  {

  public buffered: any
  public percent: number = 0
  public mediaEvents: {} = {}
  public mediaProperties: {} = {}

  @ViewChild(VideoComponent) 
  videoComponent: VideoComponent

  @ViewChild(MediaEventsComponent) 
  mediaEventsComponent: MediaEventsComponent

  @ViewChild(MediaPropertiesComponent) 
  mediaPropertiesComponent: MediaPropertiesComponent

  constructor() { 

  }

  ngOnInit() {
    this.setBodyClass()
  }

  ngAfterViewInit() {

  }

  setBodyClass(): void {
    document.getElementsByTagName('body')[0].className = 'grey lighten-5'
  }

  onBufferedEvent(buffered): void {
    this.buffered = buffered
  }

  onProgressEvent(percent): void {
    this.percent = percent
  }

  onMediaEvents(mediaEvents): void {
    this.mediaEvents = mediaEvents
  }

  onMediaProperties(mediaProperties): void {
    this.mediaProperties = mediaProperties
  }

}
