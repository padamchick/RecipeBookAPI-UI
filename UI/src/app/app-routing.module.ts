import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { RecipesComponent } from './main-container/container/recipes/recipes-main/recipes.component';
import { MainContainerComponent } from './main-container/main-container.component';
import {AuthGuard} from './auth/auth.guard';

const appRoutes: Routes = [

  { path: '', component: MainContainerComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: '/new-recipes/all', pathMatch: 'full' },
      { path: 'recipes', loadChildren: () => import('./main-container/container/old-recipes/old-recipes.module').then(module => module.OldRecipesModule) },
      { path: 'new-recipes', loadChildren: () => import('./main-container/container/recipes/recipes.module').then(m => m.RecipesModule) },
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
