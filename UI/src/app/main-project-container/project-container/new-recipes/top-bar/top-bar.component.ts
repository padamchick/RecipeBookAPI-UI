import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.less']
})
export class TopBarComponent {
  @Output() searchCriteria = new EventEmitter<string>();

  searchWord: string;

  constructor() { }

  searchThis() {
    this.searchCriteria.emit(this.searchWord)
  }
}
