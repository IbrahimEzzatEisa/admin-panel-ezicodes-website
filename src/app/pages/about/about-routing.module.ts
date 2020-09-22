import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { AboutListComponent } from './about/about-list/about-list.component';
import { AboutAddEditComponent } from './about/about-add-edit/about-add-edit.component';



const routes: Routes = [{
  path: '',
  component: AboutComponent,
      children: [
        {
          path: '',
          redirectTo: 'list',
          pathMatch: 'full'
        },
        {
          path: 'list',
          component: AboutListComponent,

        },
        {
          path: 'edit/:id',
          component: AboutAddEditComponent,

        },
        {
          path: 'add',
          component: AboutAddEditComponent,

        },
     
      ]     
    
 
  
}];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
