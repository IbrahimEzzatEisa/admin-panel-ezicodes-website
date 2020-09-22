import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  template: `<router-outlet></router-outlet>`
})
export class ServiceComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
      
  }

}
