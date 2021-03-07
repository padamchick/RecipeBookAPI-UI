import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {NgxSpinnerService} from 'ngx-spinner';
import * as authActions from '../../store/auth/auth.actions';
import {Actions, ofType} from '@ngrx/effects';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit{

  error: string;
  hide = true;
  rememberMe: boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<fromApp.AppState>,
              private spinner: NgxSpinnerService,
              private actions$: Actions) {
  }

  ngOnInit(): void {
    this.actions$.pipe(
      ofType(authActions.signUpFail))
      .subscribe(({error}) => {
      this.handleError(error);
    })
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    console.log('Form', form);
    const username = form.value.username;
    const password = form.value.password;
    const firstName = form.value.firstName;
    const lastName = form.value.lastName;
    const email = form.value.email;

    this.spinner.show()
    this.store.dispatch(authActions.signUp({username, password, firstName, lastName, email}))

    setTimeout(() => {
      form.reset();
    }, 1000);

  }

  handleError(error) {
    if(error.error && error.error.message) {
      switch (error.error.message) {
        case 'USERNAME_ALREADY_EXISTS':
          this.error = 'Username already exists';
          break;
        default:
          this.error = null;
      }
    }
  }
}
