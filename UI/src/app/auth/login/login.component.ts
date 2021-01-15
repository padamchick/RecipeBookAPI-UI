import {Component, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import * as authActions from '../store/auth.actions'
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']

})
export class LoginComponent {

  error: string = null;
  hide = true;

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
    this.store.dispatch(authActions.logIn({username: username, password: password}))

    setTimeout(() => {
      form.reset();
    }, 1000);

  }

  onHandleError() {
    this.error = null;
  }

}
