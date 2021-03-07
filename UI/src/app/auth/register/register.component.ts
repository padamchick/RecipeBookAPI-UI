import {Component, OnInit, EventEmitter, Output, ViewChild} from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {NgxSpinnerService} from 'ngx-spinner';
import * as authActions from '../../store/auth/auth.actions';
import {Actions, ofType} from '@ngrx/effects';
import {first, tap} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent {

  errors: string[] = [];
  hide = true;
  rememberMe: boolean = false;
  @ViewChild('f', { static: false }) form: NgForm

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<fromApp.AppState>,
              private spinner: NgxSpinnerService,
              private actions$: Actions) {
  }


  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.errors = [];
    const username = form.value.username;
    const password = form.value.password;
    const confirmPassword = form.value.confirmPassword;
    const email = form.value.email;

    this.spinner.show()
    this.store.dispatch(authActions.signUp({username, password, confirmPassword, email}))

    this.actions$.pipe(
      ofType(authActions.signUpFail),
      first())
      .subscribe(({error}) => {
        this.handleError(error);
        for (let name in this.form.controls) {
          if(!(name === "username" && this.errors.includes("USERNAME_ALREADY_TAKEN")
          || name === "password" && this.errors.includes("PASSWORDS_NOT_EQUAL")
          || name === "confirmPassword" && this.errors.includes("PASSWORDS_NOT_EQUAL")
          || name === "email" && this.errors.includes("EMAIL_ALREADY_TAKEN"))) {
            this.form.controls[name].setErrors(null);
          } else {
            this.form.controls[name].reset();
          }
        }
      })
  }

  handleError(error) {
    if(error.error && error.error.errors) {
      error.error.errors.forEach(error => this.errors.push(error.defaultMessage));
    }
  }
}
