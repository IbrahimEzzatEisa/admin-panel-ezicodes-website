import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { IconsComponent } from '../../icons/icons.component';
import { NotificationsComponent } from '../../notifications/notifications.component';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { SidebarComponent } from 'app/shell/sidebar/sidebar.component';
import { NavbarComponent } from 'app/shell/navbar/navbar.component';
import { ShellModule } from 'app/shell/shell.module';

@NgModule({
  imports: [
     CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ShellModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    // MatTooltipModule,
  ],
  declarations: [
    // DashboardComponent,
    // UserProfileComponent,
    // TableListComponent,
    // TypographyComponent,
    // IconsComponent,
    // MapsComponent,
    // NotificationsComponent,
    // UpgradeComponent,
  

  ]
})

export class AdminLayoutModule {}
