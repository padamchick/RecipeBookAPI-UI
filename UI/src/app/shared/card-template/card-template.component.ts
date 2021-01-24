import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-template',
  templateUrl: './card-template.component.html',
  styleUrls: ['./card-template.component.less']
})
export class CardTemplateComponent {
  @Input() displayHeader = true;
  @Input() width = 304;

}
