import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {NewRecipesComponent} from './project-container/new-recipes/new-recipes.component';

const appRoutes: Routes = [

  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: () => import('./project-container/recipes/recipes.module').then(module => module.RecipesModule) },
  { path: 'new-recipes', loadChildren: () => import('./project-container/new-recipes/new-recipes.module').then(m => m.NewRecipesModule) },
  { path: 'shopping-list', loadChildren: () => import('./project-container/shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
  { path: 'auth', loadChildren: () => import('./project-container/auth/auth.module').then(m => m.AuthModule) }


];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
