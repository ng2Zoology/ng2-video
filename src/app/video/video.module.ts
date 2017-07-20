import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

// components
import { VideoComponent } from './components/video/video.component'
import { ProgressComponent } from './components/progress/progress.component'
import { ControlsComponent } from './components/controls/controls.component'

// services
import { VideoService } from './video.service';

@NgModule({
  declarations: [
    VideoComponent,
    ProgressComponent,
    ControlsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  exports: [
    VideoComponent
  ],
  providers: [
    VideoService
  ]
})
export class VideoModule { }