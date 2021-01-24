import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NewRecipesComponent } from './new-recipes.component';
import { SecondNavbarNewRecipesComponent } from './second-navbar-new-recipes/second-navbar-new-recipes.component';

const routes: Routes = [
  {
    path: '',  children: [
      { path: '', component: SecondNavbarNewRecipesComponent, outlet: 'second-nav-bar' },
      { path: '', component: NewRecipesComponent }
    ]
  }
];

@NgModule({
    declarations: [
        NewRecipesComponent,
        SecondNavbarNewRecipesComponent
    ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})


export class NewRecipesModule { }
