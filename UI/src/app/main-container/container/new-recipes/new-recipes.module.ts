import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {NewRecipesComponent} from './recipes-main/new-recipes.component';
import {SecondNavbarNewRecipesComponent} from './second-navbar-new-recipes/second-navbar-new-recipes.component';
import {TopBarNewRecipesComponent} from './recipes-main/top-bar-new-recipes/top-bar-new-recipes.component';
import {RecipeCardComponent} from './recipes-main/cards-container/recipe-card/recipe-card.component';
import {NewRecipesResolverService} from './new-recipes-resolver.service';
import {CardsContainerComponent} from './recipes-main/cards-container/cards-container.component';
import {AuthGuard} from '../../../auth/auth.guard';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {ProjectContainerComponent} from '../project-container.component';
import { TopBarRecipeDetailComponent } from './recipe-detail/top-bar-recipe-detail/top-bar-recipe-detail.component';

const routes: Routes = [
  {
    path: '', children: [
      {path: '', component: SecondNavbarNewRecipesComponent, outlet: 'second-nav-bar'},
      {path: '', pathMatch: 'full', redirectTo: '/new-recipes/all'},
      {path: ':category',
        component: NewRecipesComponent,
        resolve: [NewRecipesResolverService]
      },
      {path: ':category/:id',
        component: RecipeDetailComponent,
        resolve: [NewRecipesResolverService]
      }
    ]
  }
];

@NgModule({
  declarations: [
    NewRecipesComponent,
    SecondNavbarNewRecipesComponent,
    TopBarNewRecipesComponent,
    RecipeCardComponent,
    CardsContainerComponent,
    RecipeDetailComponent,
    TopBarRecipeDetailComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})


export class NewRecipesModule {
}
