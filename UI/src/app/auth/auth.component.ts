import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from './auth.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less'],
})
export class AuthComponent {
  constructor() {
  }
}
