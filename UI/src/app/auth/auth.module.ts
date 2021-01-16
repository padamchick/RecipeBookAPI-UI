import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { GuestComponent } from './guest/guest.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }
]


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    GuestComponent,
    RegisterComponent
  ],
    imports: [
        FormsModule,
        RouterModule.forChild(routes),
        SharedModule,

    ]
})
export class AuthModule { }
