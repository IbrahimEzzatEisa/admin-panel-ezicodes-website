import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AboutAddEditComponent } from './about/about-add-edit/about-add-edit.component';
import { AboutComponent } from './about.component';
import { SharedModule } from 'app/shared/shared.module';
import { AboutListComponent } from './about/about-list/about-list.component';
import { AboutRoutingModule } from './about-routing.module';



@NgModule({
  declarations: [
    AboutAddEditComponent,
    AboutComponent,
    AboutListComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
   FormsModule,
    SharedModule,
  ]
})
export class AboutModule { }
