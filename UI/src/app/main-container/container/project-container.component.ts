import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {isNavbarVisible} from "../../store/app/app.selectors";

@Component({
  selector: 'app-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.less']
})
export class ProjectContainerComponent implements OnInit {

  secondNavBarVisible$;
  topBarVisible = true;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.secondNavBarVisible$ = this.store.select(isNavbarVisible);
  }

}
