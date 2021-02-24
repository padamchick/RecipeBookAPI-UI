import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-top-bar-recipe-detail',
  templateUrl: './top-bar-recipe-detail.component.html',
  styleUrls: ['./top-bar-recipe-detail.component.less']
})
export class TopBarRecipeDetailComponent implements OnInit {

  @Output('onEdit') onEditFn = new EventEmitter();
  @Output('onDelete') onDeleteFn = new EventEmitter();

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onEdit() {
    this.onEditFn.emit();
  }

  onDelete() {
    this.onDeleteFn.emit()
  }
}
