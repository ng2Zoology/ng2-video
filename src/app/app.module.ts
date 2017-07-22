import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'

// modules
import { VideoModule } from './video/video.module'

// components
import { AppComponent } from './app.component'
import { NavComponent } from './nav/nav.component'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    VideoModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
