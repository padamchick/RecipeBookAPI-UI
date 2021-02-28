import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SecondNavbarNewRecipesComponent} from './second-navbar-new-recipes/second-navbar-new-recipes.component';
import {RecipesResolverService} from './recipes-resolver.service';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {CardsContainerComponent} from './recipes-main/cards-container.component';

const routes: Routes = [
  {
    path: '', children: [
      {path: '', component: SecondNavbarNewRecipesComponent, outlet: 'second-nav-bar'},
      {path: '', pathMatch: 'full', redirectTo: '/recipes/all'},
      {path: 'new', component: RecipeEditComponent},
      {path: ':category',
        component: CardsContainerComponent,
        resolve: [RecipesResolverService]
      },
      {path: ':category/:id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService]
      },
      {path: ':category/:id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
