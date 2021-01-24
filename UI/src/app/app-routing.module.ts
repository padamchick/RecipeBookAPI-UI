import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {NewRecipesComponent} from './main-project-container/project-container/new-recipes/new-recipes.component';
import {MainProjectContainerComponent} from './main-project-container/main-project-container.component';

const appRoutes: Routes = [

  { path: '', component: MainProjectContainerComponent, children: [
      { path: '', redirectTo: '/recipes', pathMatch: 'full' },
      { path: 'recipes', loadChildren: () => import('./main-project-container/project-container/recipes/recipes.module').then(module => module.RecipesModule) },
      { path: 'new-recipes', loadChildren: () => import('./main-project-container/project-container/new-recipes/new-recipes.module').then(m => m.NewRecipesModule) },
      { path: 'shopping-list', loadChildren: () => import('./main-project-container/project-container/shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
    ]
  },
  { path: 'auth', loadChildren: () => import('./main-project-container/project-container/auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
