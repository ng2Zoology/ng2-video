import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-component',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public title = 'Angular 2 Video Component';

  constructor() { 
      
  }

  ngOnInit() {

  }

}
