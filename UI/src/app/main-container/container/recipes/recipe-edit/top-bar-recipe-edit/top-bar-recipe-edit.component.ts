import { Component, OnInit } from '@angular/core';
import {NavigationService} from '../../../../../shared/services/navigation.service';

@Component({
  selector: 'app-top-bar-recipe-edit',
  templateUrl: './top-bar-recipe-edit.component.html',
  styleUrls: ['./top-bar-recipe-edit.component.less']
})
export class TopBarRecipeEditComponent implements OnInit {

  constructor( private navigationService: NavigationService ) { }

  ngOnInit(): void {
  }

  back() {
    this.navigationService.back();
  }

}
