import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import * as authActions from './project-container/auth/store/auth.actions'
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  constructor(private store: Store<AppState>,
              public translate: TranslateService) {
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('en');
    translate.use('en')
  }

  ngOnInit(): void {
    this.store.dispatch(authActions.autoLogIn());
  }
}
