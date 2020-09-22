import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/services/Guards';

const routes: Routes =[
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        redirectTo: 'pages',
        pathMatch: 'full'
      },
      {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
         canLoad:[AuthGuard]
      },
      {
        path: 'login',
        component: LoginComponent
      },


      {
        path: '**',
        redirectTo: 'pages'
      }
    ]
  }

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{})
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
