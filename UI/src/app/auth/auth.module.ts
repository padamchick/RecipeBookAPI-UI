import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { GuestComponent } from './guest/guest.component';
import { RegisterComponent } from './register/register.component';
import { NgxSpinnerModule } from 'ngx-spinner';




@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    GuestComponent,
    RegisterComponent
  ],
    imports: [
        FormsModule,
        RouterModule.forChild([{path: '', component: AuthComponent}]),
        SharedModule,
        NgxSpinnerModule
    ]
})
export class AuthModule { }
