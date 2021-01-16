import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import {NgxSpinnerService} from 'ngx-spinner';
import * as authActions from '../store/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent{

  error: string = null;
  hide = true;
  rememberMe: boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<fromApp.AppState>,
              private spinner: NgxSpinnerService) {
  }


  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const username = form.value.username;
    const password = form.value.password;

    this.spinner.show()
    this.store.dispatch(authActions.signUp({username: username, password: password}))

    setTimeout(() => {
      form.reset();
    }, 1000);

  }

  onHandleError() {
    this.error = null;
  }
}
