import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from './auth.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less'],
})
export class AuthComponent implements OnInit, OnDestroy {
  loginMode = true;
  isLoading = false;
  loadingSub: Subscription;

  constructor(private authService: AuthService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.loadingSub = this.authService.isLoading.subscribe(isLoading => {
      if(isLoading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }

  onChangeMode(event) {
    if (event.index === 0) {
      this.loginMode = true;
    } else {
      this.loginMode = false;
    }
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }
}
