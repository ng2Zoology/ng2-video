import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-component',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public title:string = 'ng2-video'

  constructor() { 
      
  }

  ngOnInit() {

  }

}
