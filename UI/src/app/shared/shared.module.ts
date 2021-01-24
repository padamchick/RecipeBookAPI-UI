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
import { SecondNavbarLayoutComponent } from '../main-project-container/second-navbar-layout/second-navbar-layout.component';
import { CardTemplateComponent } from './card-template/card-template.component';


@NgModule({
  declarations: [
    DropdownDirective,
    ConfirmationDialogComponent,
    IngredientEditComponent,
    SecondNavbarLayoutComponent,
    CardTemplateComponent,
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
    ToastrModule,
    SecondNavbarLayoutComponent,
    CardTemplateComponent
  ]
})
export class SharedModule {}
