import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { HomeAddEditComponent } from './home-add-edit/home-add-edit.component';
import { HomeListComponent } from './home-list/home-list.component';
import { HomeComponent } from './home.component';
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule({
    declarations: [
HomeAddEditComponent,
HomeListComponent,
HomeComponent
    ],
    imports: [
      CommonModule,
      HomeRoutingModule,
      FormsModule,
      SharedModule,
      AngularEditorModule

    ]
})
export class HomeModule { }
