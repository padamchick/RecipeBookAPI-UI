import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes-main/recipes.component';
import {SecondNavbarNewRecipesComponent} from './second-navbar-new-recipes/second-navbar-new-recipes.component';
import {TopBarRecipesComponent} from './recipes-main/top-bar-new-recipes/top-bar-recipes.component';
import {RecipeCardComponent} from './recipes-main/cards-container/recipe-card/recipe-card.component';
import {RecipesResolverService} from './recipes-resolver.service';
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
        component: RecipesComponent,
        resolve: [RecipesResolverService]
      },
      {path: ':category/:id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService]
      }
    ]
  }
];

@NgModule({
  declarations: [
    RecipesComponent,
    SecondNavbarNewRecipesComponent,
    TopBarRecipesComponent,
    RecipeCardComponent,
    CardsContainerComponent,
    RecipeDetailComponent,
    TopBarRecipeDetailComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})


export class RecipesModule {
}
