import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {NewRecipesComponent} from './new-recipes/new-recipes.component';

const appRoutes: Routes = [

  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(module => module.RecipesModule) },
  { path: 'new-recipes', component: NewRecipesComponent },
  // { path: 'new-recipes', loadChildren: () => import('./new-recipes/new-recipes.module').then(m => m.NewRecipesModule) },
  { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }


];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
