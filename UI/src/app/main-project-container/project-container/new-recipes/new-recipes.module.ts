import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {NewRecipesComponent} from './new-recipes.component';
import {SecondNavbarNewRecipesComponent} from './second-navbar-new-recipes/second-navbar-new-recipes.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import {NewRecipesResolverService} from './new-recipes-resolver.service';

const routes: Routes = [
  {
    path: '', children: [
      {path: '', component: SecondNavbarNewRecipesComponent, outlet: 'second-nav-bar'},
      {path: '', component: NewRecipesComponent, resolve: [NewRecipesResolverService]}
    ]
  }
];

@NgModule({
  declarations: [
    NewRecipesComponent,
    SecondNavbarNewRecipesComponent,
    TopBarComponent,
    RecipeCardComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})


export class NewRecipesModule {
}
