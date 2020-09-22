import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { ServiceAddEditComponent } from './service/service-add-edit/service-add-edit.component';
import { ServicetListComponent } from './service/servicet-list/servicet-list.component';
import { ServiceComponent } from './service.component';
import { ServiceRoutingModule } from './service-routing.module';
import { AngularEditorModule } from '@kolkov/angular-editor';



@NgModule({
  declarations: [
    ServiceAddEditComponent,
    ServicetListComponent,
    ServiceComponent
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule,
   FormsModule,
    SharedModule,
    AngularEditorModule
    
  ]
})
export class ServiceModule { }
