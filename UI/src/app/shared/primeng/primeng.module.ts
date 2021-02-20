import {NgModule} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';

const primeNgComponents = [
  DialogModule,
  DynamicDialogModule

];

@NgModule({
  imports: [primeNgComponents],
  exports: [primeNgComponents]
})
export class PrimeNgModule { }
