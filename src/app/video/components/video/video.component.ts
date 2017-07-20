import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

// interfaces
import { VideoInterface } from '../../video.interface'

// services
import { VideoService } from '../../video.service'

// plugins
const VanillaTilt = require('vanilla-tilt')

@Component({
  moduleId: module.id,
  selector: 'video-component',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  public video: VideoInterface
  public videoElement: HTMLVideoElement

  public buffered: any
  public percent: number
  public currentTime: number
  public currentTitle: string
  public currentDescription: string
  public isPlaying: boolean

  readonly MEDIA_EVENTS_CANPLAY = 'canplay'
  readonly MEDIA_EVENTS_CANPLAYTHROUGH = 'canplaythrough'
  readonly MEDIA_EVENTS_ENDED = 'ended'
  readonly MEDIA_EVENTS_LOADSTART = 'loadstart'
  readonly MEDIA_EVENTS_LOADEDMETADATA = 'loadedmetadata'
  readonly MEDIA_EVENTS_PLAY = 'play'
  readonly MEDIA_EVENTS_PLAYING = 'playing'
  readonly MEDIA_EVENTS_PAUSE = 'pause'
  readonly MEDIA_EVENTS_PROGRESS = 'progress'
  readonly MEDIA_EVENTS_SEEKED = 'seeked'
  readonly MEDIA_EVENTS_STALLED = 'stalled'
  readonly MEDIA_EVENTS_TIMEUPDATE = 'timeupdate'
  readonly MEDIA_EVENTS_VOLUMECHANGE = 'volumechange'
  readonly MEDIA_EVENTS_WAITING = 'waiting'

  constructor(private videoService:VideoService) { 
    
  }

  ngOnInit() {
    this.videoService
      .getVideo(1)
      .subscribe((response: VideoInterface) => {
        this.video = response
        this.onAfterInitialize()
      })
  }

  onAfterInitialize(): void {
    this.attachVideoElement()
    this.bindMediaEvents()
    this.setVideoSrc()
  }

  attachVideoElement(): void {
    this.videoElement = document.getElementsByTagName('video')[0];
  }

  bindMediaEvents(): void {
    this.videoElement.addEventListener(this.MEDIA_EVENTS_CANPLAY, this.onCanPlay)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_CANPLAYTHROUGH, this.onCanPlayThrough)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_LOADEDMETADATA, this.onLoadedmetadata)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_TIMEUPDATE, this.onTimeUpdate)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_PLAY, this.onPlay)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_PAUSE, this.onPause)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_ENDED, this.onEnded)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_PROGRESS, this.onProgress)
  }

  initTilt():void {
      VanillaTilt.init(this.videoElement);
  }

  getVideoSrc(): string {
    return './assets/' + this.video.src
  }

  setVideoSrc(): void {
    this.videoElement.src = this.getVideoSrc()
    this.videoElement.pause()
    this.isPlaying = false
  }

  onProgress = (event:any): void => {
      if(this.videoElement.buffered.length) {
        this.buffered = this.videoElement.buffered.end(0)
        this.percent = this.buffered / this.videoElement.duration
      }
  }

  onTimeUpdate = (event:any): void => {
    this.currentTime = this.videoElement.currentTime
    console.log(this.currentTime);
  }

  onCanPlay = (event:any): void => {
    console.log(event)
  }

  onCanPlayThrough = (event:any): void => {
    console.log(event)
  }

  onLoadedmetadata = (event:any): void => {
    console.log(event)
  }

  onPlay = (event:any): void => {
    console.log(event)
  }

  onPause = (event:any): void => {
    console.log(event)
  }

  onEnded = (event:any): void => {
    console.log(event)
  }

  requestFullscreen() {
      if(this.videoElement.requestFullscreen) {
          this.videoElement.requestFullscreen();
      // } else if (this.videoElement.mozRequestFullScreen) {
      //      this.videoElement.mozRequestFullScreen();
      } else if (this.videoElement.webkitRequestFullscreen) {
          this.videoElement.webkitRequestFullscreen();
      // } else if (this.videoElement.msRequestFullscreen) {
      //      this.videoElement.msRequestFullscreen();
      }
  }

}