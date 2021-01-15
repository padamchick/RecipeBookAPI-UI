import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { IngredientEditComponent } from './ingredient-edit/ingredient-edit.component';
import { FormsModule } from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
  declarations: [
    DropdownDirective,
    ConfirmationDialogComponent,
    IngredientEditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    LayoutModule,
    FormsModule,
    NgxSpinnerModule
  ],
  exports: [
    DropdownDirective,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    LayoutModule,
    NgxSpinnerModule
  ]
})
export class SharedModule {}
