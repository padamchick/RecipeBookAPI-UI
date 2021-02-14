import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {RecipesComponent} from './recipes-main/recipes.component';
import {SecondNavbarNewRecipesComponent} from './second-navbar-new-recipes/second-navbar-new-recipes.component';
import {TopBarRecipesComponent} from './recipes-main/top-bar-new-recipes/top-bar-recipes.component';
import {RecipeCardComponent} from './recipes-main/cards-container/recipe-card/recipe-card.component';
import {CardsContainerComponent} from './recipes-main/cards-container/cards-container.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import { TopBarRecipeDetailComponent } from './recipe-detail/top-bar-recipe-detail/top-bar-recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import {RecipesRoutingModule} from './recipes-routing.module';

@NgModule({
  declarations: [
    RecipesComponent,
    SecondNavbarNewRecipesComponent,
    TopBarRecipesComponent,
    RecipeCardComponent,
    CardsContainerComponent,
    RecipeDetailComponent,
    TopBarRecipeDetailComponent,
    RecipeEditComponent,
  ],
  imports: [
    RouterModule,
    RecipesRoutingModule,
    SharedModule
  ]
})


export class RecipesModule {
}
