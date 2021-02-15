import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-top-bar-recipe-detail',
  templateUrl: './top-bar-recipe-detail.component.html',
  styleUrls: ['./top-bar-recipe-detail.component.less']
})
export class TopBarRecipeDetailComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onEdit() {
      this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
