import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SecondNavbarNewRecipesComponent} from './second-navbar-new-recipes/second-navbar-new-recipes.component';
import {RecipesComponent} from './recipes-main/recipes.component';
import {RecipesResolverService} from './recipes-resolver.service';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';

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
