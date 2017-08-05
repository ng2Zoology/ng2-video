import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'nav-component',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Output()
  onAddFilter: EventEmitter<any> = new EventEmitter<any>()

  public title:string = 'ng2-video'

  constructor() { 
      
  }

  ngOnInit() {

  }

  toggleFilter(): void {
    this.onAddFilter.emit(true)
  }

}
