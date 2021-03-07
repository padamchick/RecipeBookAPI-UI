import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainContainerComponent } from './main-container/main-container.component';
import {AuthGuard} from './auth/auth.guard';

const appRoutes: Routes = [

  { path: '', component: MainContainerComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: '/recipes/all', pathMatch: 'full' },
      { path: 'old-recipes', loadChildren: () => import('./main-container/container/old-recipes/old-recipes.module').then(module => module.OldRecipesModule) },
      { path: 'recipes', loadChildren: () => import('./main-container/container/recipes/recipes.module').then(m => m.RecipesModule) }
    ]
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
