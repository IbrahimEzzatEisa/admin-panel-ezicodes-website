import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { TableListComponent } from './message/table-list.component';
import { ConfigurationsComponent } from './configurations/configurations.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    },

    {
      path: 'whyezi',
      loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
    },
    {
      path: 'service',
      loadChildren: () => import('./service/service.module').then(m => m.ServiceModule),
    },

   {

  path:'message',
  component: TableListComponent 
 },
 {

  path:'configuration',
  component: ConfigurationsComponent 
 },

  ]
 
}];

@NgModule({ 
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class 
PagesRoutingModule { }
