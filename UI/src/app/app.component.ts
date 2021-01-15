import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from './store/app.reducer';
import * as authActions from './auth/store/auth.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(authActions.autoLogIn());
  }
}
