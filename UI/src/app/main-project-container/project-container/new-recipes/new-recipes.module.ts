import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NewRecipesComponent } from './new-recipes.component';

const routes: Routes = [
  {
    path: '',
    component: NewRecipesComponent,
  }
];

@NgModule({
    declarations: [
        NewRecipesComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        SharedModule
    ]
})


export class NewRecipesModule { }
