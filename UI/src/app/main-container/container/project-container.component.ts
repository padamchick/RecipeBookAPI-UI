import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.less']
})
export class ProjectContainerComponent implements OnInit {

  secondNavBarVisible = true;
  topBarVisible = true;

  constructor() { }

  ngOnInit(): void {
  }

}
