import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent {

  _super: string;
  @Input()
  set super(text: string) {
    this._super = text;
  }

  _section: string;
  @Input()
  set section(text: string) {
    this._section = text;
  }

  _sectionLink: string;
  @Input()
  set sectionLink(text: string) {
    this._sectionLink = text;
  }

  _title: string;
  @Input()
  set title(text: string) {
    this._title = text;
  }

  _pageTitle: string;
  @Input()
  set pageTitle(text: string) {
    this._pageTitle = text;
  }


  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) { }

  navToSection() {
    if(this._sectionLink) {
      this.router.navigate([this._sectionLink]);
    } else if (this.route.url['_value'][0].path === 'add') {
      this.router.navigate(['../'], {
        relativeTo: this.route
      });
    }
    else if (this.route.url['_value'][2]) {
      this.router.navigate(['../../../'], {
        relativeTo: this.route
      });
    }
     else {
      this.router.navigate(['../../'], {
        relativeTo: this.route
      });
    }
  }

}
