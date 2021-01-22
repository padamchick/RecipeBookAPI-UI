import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { IngredientEditComponent } from './ingredient-edit/ingredient-edit.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';


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
    NgxSpinnerModule,
    TranslateModule,
    ToastrModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    LayoutModule,
    NgxSpinnerModule,
    TranslateModule,
    ToastrModule
  ]
})
export class SharedModule {}
