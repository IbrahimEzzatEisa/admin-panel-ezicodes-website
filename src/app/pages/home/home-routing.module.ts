import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAddEditComponent } from './home-add-edit/home-add-edit.component';
import { HomeComponent } from './home.component';
import { HomeListComponent } from './home-list/home-list.component';





const routes: Routes = [{
  path: '',
  component: HomeComponent,
      children: [
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full'
        },
        {
          path: 'list',
          component: HomeListComponent,

        },
        {
          path: 'edit/:id',
          component: HomeAddEditComponent,

        },
        {
          path: 'add',
          component: HomeAddEditComponent,

        },
     
      ]     
    
 
  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
