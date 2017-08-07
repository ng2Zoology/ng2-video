import { Component, OnInit, OnDestroy, Input, Output, OnChanges, EventEmitter } from '@angular/core'

// interfaces
import { VideoInterface } from './video.interface'

// services
import { VideoService } from './video.service'

@Component({
  moduleId: module.id,
  selector: 'video-component',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, OnChanges {

  public video: VideoInterface
  public videoElement: HTMLVideoElement
  public videoId: number = 1

  public buffered: any
  public progress: number = 0
  public percent: number = 0
  public timeUpdate: number = 0
  public volumeChange: number = 0
  public currentTime: number = 0
  public duration: number = 0

  public mediaEvents: {} = {}
  public mediaProperties: {} = {}
  public mediaProperty: {} = {}

  readonly MEDIA_EVENTS_ABORT = 'abort'
  readonly MEDIA_EVENTS_CANPLAY = 'canplay'
  readonly MEDIA_EVENTS_CANPLAYTHROUGH = 'canplaythrough'
  readonly MEDIA_EVENTS_DURATIONCHANGE = 'durationchange'
  readonly MEDIA_EVENTS_ENDED = 'ended'
  readonly MEDIA_EVENTS_ERROR = 'error'
  readonly MEDIA_EVENTS_LOADEDDATA = 'loadeddata'
  readonly MEDIA_EVENTS_LOADEDMETADATA = 'loadedmetadata'
  readonly MEDIA_EVENTS_LOADSTART = 'loadstart'
  readonly MEDIA_EVENTS_PAUSE = 'pause'
  readonly MEDIA_EVENTS_PLAY = 'play'
  readonly MEDIA_EVENTS_PLAYING = 'playing'
  readonly MEDIA_EVENTS_PROGRESS = 'progress'
  readonly MEDIA_EVENTS_RATECHANGE = 'ratechange'
  readonly MEDIA_EVENTS_SEEKED = 'seeked'
  readonly MEDIA_EVENTS_SEEKING = 'seeking'
  readonly MEDIA_EVENTS_STALLED = 'stalled'
  readonly MEDIA_EVENTS_SUSPEND = 'suspend'
  readonly MEDIA_EVENTS_TIMEUPDATE = 'timeupdate'
  readonly MEDIA_EVENTS_VOLUMECHANGE = 'volumechange'
  readonly MEDIA_EVENTS_WAITING = 'waiting'

  readonly MEDIA_PROPERTIES = ['error', 'src', 'srcObject', 'currentSrc', 'crossOrigin', 'networkState', 'preload', 
    'buffered', 'readyState', 'seeking', 'currentTime', 'duration', 'paused', 'defaultPlaybackRate', 'playbackRate', 
    'played', 'seekable', 'ended', 'autoplay', 'loop', 'controls', 'volume', 'muted', 'defaultMuted', 'audioTracks', 
    'videoTracks', 'textTracks', 'width', 'height', 'videoWidth', 'videoHeight', 'poster']

  @Output()
  onBufferedEvent: EventEmitter<any> = new EventEmitter<any>()

  @Output()
  onProgressEvent: EventEmitter<number> = new EventEmitter<number>()

  @Output()
  onMediaEvents: EventEmitter<any> = new EventEmitter<any>()

  @Output()
  onMediaProperties: EventEmitter<any> = new EventEmitter<any>()

  constructor(private videoService:VideoService) { 
    
  }

  ngOnInit(): void {
    this.videoService
      .getVideo(this.videoId)
      .subscribe((response: VideoInterface) => {
        this.video = response
        this.onAfterInitialize()
      })
  }

  ngOnChanges(changes) {

  }

  onAfterInitialize(): void {
    this.attachVideoElement()
    this.bindMediaEvents()
    this.bindMediaProperties()
    this.setSource()
    this.enableControls()
    this.enableReplay()
  }

  attachVideoElement(): void {
    this.videoElement = document.getElementsByTagName('video')[0]
  }

  bindMediaEvents(): void {
    this.videoElement.addEventListener(this.MEDIA_EVENTS_ABORT, this.onAbort)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_CANPLAY, this.onCanPlay)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_CANPLAYTHROUGH, this.onCanPlayThrough)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_DURATIONCHANGE, this.onDurationChange)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_ENDED, this.onEnded)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_ERROR, this.onError)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_LOADEDDATA, this.onLoadeddata)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_LOADEDMETADATA, this.onLoadedmetadata)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_LOADSTART, this.onLoadStart)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_PAUSE, this.onPause)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_PLAY, this.onPlay)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_PLAYING, this.onPlaying)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_ENDED, this.onEnded)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_PROGRESS, this.onProgress)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_RATECHANGE, this.onRateChange)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_SEEKED, this.onSeeked)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_SEEKING, this.onSeeking)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_STALLED, this.onStalled)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_SUSPEND, this.onSuspend)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_TIMEUPDATE, this.onTimeUpdate)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_VOLUMECHANGE, this.onVolumeChange)
    this.videoElement.addEventListener(this.MEDIA_EVENTS_WAITING, this.onWaiting)
  }

  bindMediaProperties(): void {
    for (let property of this.MEDIA_PROPERTIES) {
      switch(property) {
        case 'src':
        case 'currentSrc':
          this.mediaProperty[property] = this.video.src
          break
        default : 
          this.mediaProperty[property] = eval('this.videoElement.' + property)
          break
      }
    }

    this.updateProperties(this.mediaProperty)
  }

  getSource(): string {
    return './assets/' + this.video.src + '?t=' + (new Date()).getTime()
  }

  setSource(): void {
    this.videoElement.src = this.getSource()
    this.videoElement.pause()
    this.videoElement.muted = true
  }

  enableControls(): void {
    this.videoElement.controls = true
  }

  disableControls(): void {
    this.videoElement.controls = false
  }

  enableReplay(): void {
    this.videoElement.loop = true
  }

  updateEvents = (value: {}): any => {
    this.mediaEvents = Object.assign({}, this.mediaEvents, value)
    this.onMediaEvents.emit(this.mediaEvents)
  }

  updateProperties(value: {}): any {
    this.mediaProperties = Object.assign({}, this.mediaProperties, value)
    this.onMediaProperties.emit(this.mediaProperties)
  }

  onAbort = (event:any): void => {
    this.updateEvents({abort: true})
  }

  onCanPlay = (event:any): void => {
    this.updateEvents({canplay: true})
  }

  onCanPlayThrough = (event:any): void => {
    this.updateEvents({canplaythrough: true})
  }

  onDurationChange = (event:any): void => {
    this.updateEvents({durationchange: true})
  }

  onEnded = (event:any): void => {
    this.updateEvents({ended: true})
  }

  onError = (event:any): void => {
    this.updateEvents({error: true})
  } 

  onLoadeddata = (event:any): void => {
    this.updateEvents({loadeddata: true})
  } 

  onLoadedmetadata = (event:any): void => {
    this.updateEvents({onloadedmetadata: true})
  }

  onLoadStart = (event:any): void => {
    this.updateEvents({onloadstart: true})
  } 

  onPause = (event:any): void => {
    this.updateEvents({pause: true})
  }

  onPlay = (event:any): void => {
    this.updateEvents({play: true})
  }

  onPlaying = (event:any): void => {
    this.updateEvents({playing: true})
  }

  onProgress = (event:any): void => {
    if(!this.videoElement.buffered.length) return
      
    this.progress = this.progress + 1
    this.buffered = this.videoElement.buffered.end(0)
    this.percent = this.buffered / this.videoElement.duration

    this.onBufferedEvent.emit(this.buffered)
    this.onProgressEvent.emit(this.percent)

    this.updateEvents({progress: this.progress})
  }

  onRateChange = (event:any): void => {
    this.updateEvents({ratechange: true})
  }

  onSeeked = (event:any): void => {
    this.updateEvents({seeked: true})
    this.updateEvents({seeking: false})
  }

  onSeeking = (event:any): void => {
    this.updateEvents({seeking: true})
  }

  onStalled = (event:any): void => {
    this.updateEvents({stalled: true})
  }

  onSuspend = (event:any): void => {
    this.updateEvents({suspend: true})
  }

  onVolumeChange = (event:any): void => {
    this.volumeChange = this.volumeChange + 1
    this.updateEvents({volumechange: this.volumeChange})
  }

  onTimeUpdate = (event:any): void => {
    this.timeUpdate = this.timeUpdate + 1
    this.bindMediaProperties()
    this.updateEvents({timeupdate: this.timeUpdate})
  }

  onWaiting = (event:any): void => {
    this.updateEvents({waiting: true})
  }

  ngOnDestroy(): void { 
    //@todo cleanup unbind all video listeners
  }

}