import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { IngredientEditComponent } from './ingredient-edit/ingredient-edit.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { SecondNavbarLayoutComponent } from '../main-container/second-navbar-layout/second-navbar-layout.component';
import { CardTemplateComponent } from './card-template/card-template.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { NgxMasonryModule } from 'ngx-masonry';
import { TopBarComponent } from '../main-container/top-bar/top-bar.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DialogTemplateComponent } from './dialog-template/dialog-template.component';
import { IngredientDialogComponent } from './dialogs/ingredient-dialog/ingredient-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    DropdownDirective,
    ConfirmationDialogComponent,
    IngredientEditComponent,
    SecondNavbarLayoutComponent,
    TopBarComponent,
    CardTemplateComponent,
    TruncatePipe,
    DialogTemplateComponent,
    IngredientDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    LayoutModule,
    FormsModule,
    NgxSpinnerModule,
    TranslateModule,
    ToastrModule,
    NgxMasonryModule,
    NgScrollbarModule
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
    TopBarComponent,
    CardTemplateComponent,
    TruncatePipe,
    NgxMasonryModule,
    NgScrollbarModule,
    DialogTemplateComponent,
    IngredientDialogComponent,
    ConfirmDialogComponent
  ],
})
export class SharedModule {}
