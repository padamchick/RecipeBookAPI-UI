import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OldRecipesComponent } from './old-recipes.component';
import { OldRecipeListComponent } from './old-recipe-list/old-recipe-list.component';
import { OldRecipeDetailComponent } from './old-recipe-detail/old-recipe-detail.component';
import { OldRecipeItemComponent } from './old-recipe-list/recipe-item/old-recipe-item.component';
import { RecipeStartComponent } from './old-recipe-start/recipe-start.component';
import { OldRecipeEditComponent } from './old-recipe-edit/old-recipe-edit.component';
import { OldRecipesRoutingModule } from './old-recipes-routing.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    OldRecipesComponent,
    OldRecipeListComponent,
    OldRecipeDetailComponent,
    OldRecipeItemComponent,
    RecipeStartComponent,
    OldRecipeEditComponent
  ],
  imports: [
    RouterModule,
    OldRecipesRoutingModule,
    SharedModule
  ]
})
export class OldRecipesModule { }
