import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NewRecipesComponent } from './main-container/container/new-recipes/new-recipes.component';
import { MainContainerComponent } from './main-container/main-container.component';

const appRoutes: Routes = [

  { path: '', component: MainContainerComponent, children: [
      { path: '', redirectTo: '/new-recipes/all', pathMatch: 'full' },
      { path: 'recipes', loadChildren: () => import('./main-container/container/recipes/recipes.module').then(module => module.RecipesModule) },
      { path: 'new-recipes', loadChildren: () => import('./main-container/container/new-recipes/new-recipes.module').then(m => m.NewRecipesModule) },
      { path: 'shopping-list', loadChildren: () => import('./main-container/container/shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
    ]
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
