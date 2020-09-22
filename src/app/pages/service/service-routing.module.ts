import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceComponent } from './service.component';
import { ServicetListComponent } from './service/servicet-list/servicet-list.component';
import { ServiceAddEditComponent } from './service/service-add-edit/service-add-edit.component';



const routes: Routes = [{
  path: '',
  component: ServiceComponent,
      children: [
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full'
        },
        {
          path: 'list',
          component: ServicetListComponent,

        },
        {
          path: 'edit/:id',
          component: ServiceAddEditComponent,

        },
        {
          path: 'add',
          component: ServiceAddEditComponent,
        },
     
      ]     
    
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
