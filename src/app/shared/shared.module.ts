import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { RouterModule } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PageTitleComponent } from './components/page-title/page-title.component';


@NgModule({
  declarations: [ PageTitleComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    RouterModule,
    AngularEditorModule
    
  ],
  exports: [
    PageTitleComponent  ]
})
export class SharedModule { }
