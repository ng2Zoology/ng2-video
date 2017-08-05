import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'mediaproperties-component',
  templateUrl: './mediaproperties.component.html',
  styleUrls: ['./mediaproperties.component.scss']
})
export class MediaPropertiesComponent implements OnChanges {

  @Input()
  mediaProperties: any

  public title : string = 'Media Properties'
  public subtitle : string = ''

  constructor() { 
      
  }

  ngOnChanges(changes) {
    this.mediaProperties = Object.assign({}, changes.mediaProperties.currentValue)
  }

}
