import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OldRecipesComponent } from './old-recipes.component';

import { AuthGuard } from '../../../auth/auth.guard';
import { RecipeStartComponent } from './old-recipe-start/recipe-start.component';
import { OldRecipeEditComponent } from './old-recipe-edit/old-recipe-edit.component';
import { OldRecipeDetailComponent } from './old-recipe-detail/old-recipe-detail.component';
import { OldRecipesResolverService } from './old-recipes-resolver.service';
import { OldRoleGuard } from './old-role.guard';
import { CanDeactivateGuard } from '../../../shared/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: OldRecipesComponent,
    resolve: [OldRecipesResolverService],
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: OldRecipeEditComponent, canActivate: [OldRoleGuard], canDeactivate: [CanDeactivateGuard] },
      {
        path: ':id',
        component: OldRecipeDetailComponent,
        resolve: [OldRecipesResolverService],
      },
      {
        path: ':id/edit',
        component: OldRecipeEditComponent,
        canActivate: [OldRoleGuard],
        canDeactivate: [CanDeactivateGuard],
        resolve: [OldRecipesResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OldRecipesRoutingModule {}
