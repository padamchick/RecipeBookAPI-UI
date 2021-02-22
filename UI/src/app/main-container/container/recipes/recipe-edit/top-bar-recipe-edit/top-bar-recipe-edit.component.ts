import {Component, Input, OnInit} from '@angular/core';
import {NavigationService} from '../../../../../shared/services/navigation.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-top-bar-recipe-edit',
  templateUrl: './top-bar-recipe-edit.component.html',
  styleUrls: ['./top-bar-recipe-edit.component.less']
})
export class TopBarRecipeEditComponent implements OnInit {
  @Input() editMode: boolean;

  constructor(private navigationService: NavigationService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  back() {
    if (this.editMode || !this.navigationService.prevUrl) {
      this.router.navigate(['../'], {relativeTo: this.route});
    } else {
      this.router.navigateByUrl(this.navigationService.prevUrl);
    }
  }
}
