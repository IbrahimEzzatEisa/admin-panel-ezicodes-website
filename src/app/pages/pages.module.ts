import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifierModule } from "angular-notifier";

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ShellModule } from 'app/shell/shell.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'app/shared/shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TableListComponent } from './message/table-list.component';
import { ConfigurationsComponent } from './configurations/configurations.component';

const components = [
  PagesComponent,
  TableListComponent,
  ConfigurationsComponent
  
]
@NgModule({
  declarations: [
    ...components,
      
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ShellModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    SharedModule,
    NotifierModule,
    AngularEditorModule,

  ]
})
export class PagesModule { }
