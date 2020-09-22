import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'home', title: 'Home',  icon: 'dashboard', class: '' },
    { path: 'service', title: 'Services',  icon:'person', class: '' },
    { path: 'whyezi', title: 'whyezicodes',  icon: 'help', class: '' },
    { path: 'message', title: 'Message',  icon:'content_paste', class: '' },
    { path: 'configuration', title: ' Configuration',  icon:'build', class: '' },
    { path: '/login', title: 'LOG OUT',  icon:'logout', class: '' },
    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor( private router: Router ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  
    }  
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
