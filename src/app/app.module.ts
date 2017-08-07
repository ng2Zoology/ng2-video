import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

// components
import { AppComponent } from './app.component'
import { NavComponent } from './components/nav/nav.component'
import { VideoComponent } from './components/video/video.component'
import { ProgressComponent } from './components/progress/progress.component'
import { MediaEventsComponent } from './components/mediaevents/mediaevents.component'
import { MediaPropertiesComponent } from './components/mediaproperties/mediaproperties.component'

// services
import { VideoService } from './components/video/video.service'

//pipes
import { NgPipesModule } from 'ngx-pipes'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    VideoComponent,
    ProgressComponent,
    MediaEventsComponent,
    MediaPropertiesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgPipesModule
  ],
  providers: [
    VideoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
