import { Component, OnInit, EventEmitter } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {isNavbarVisible} from "../../store/app/app.selectors";
import {takeUntil} from "rxjs/operators";
import {hideNavBar, showNavBar} from "../../store/app/app.actions";
import * as appActions from '../../store/app/app.actions'
import {BehaviorSubject} from "rxjs";
import {LayoutService} from "../../shared/services/layout.service";

@Component({
  selector: 'app-main-left-navbar',
  templateUrl: './main-left-navbar.component.html',
  styleUrls: ['./main-left-navbar.component.less']
})
export class MainLeftNavbarComponent implements OnInit {
  isNavbarVisible$;

  ngUnsubscribe = new EventEmitter();

  constructor(private store: Store<AppState>,
              private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.isNavbarVisible$ = this.store.select(isNavbarVisible)

  }

  hideNavbar() {
    this.layoutService.hideNavbar()
  }

  showNavbar() {
    this.layoutService.showNavbar()
  }
}
