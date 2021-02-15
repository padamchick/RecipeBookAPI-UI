import {Component, Output, EventEmitter, ViewEncapsulation, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import * as authActions from '../store/auth.actions'
import {NgxSpinnerService} from 'ngx-spinner';
import {LoginService} from '../../shared/services/login.service';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']

})
export class LoginComponent implements OnInit, OnDestroy{

  error: string = null;
  hide = true;
  rememberMe: boolean = false;
  ngUnsubscribe = new Subject();
  @ViewChild('f', {static: true}) form: NgForm;

  ngOnInit(): void {
    this.loginService.redirectSubject
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(isRedirected => {
        if(isRedirected) {
          this.form.reset();
        }
      });
  }

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<fromApp.AppState>,
              private spinner: NgxSpinnerService,
              private loginService: LoginService) {
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const username = this.form.value.username;
    const password = this.form.value.password;

    this.spinner.show()
    this.store.dispatch(authActions.logIn({username: username, password: password, toRemember: this.rememberMe}))

  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }



}
