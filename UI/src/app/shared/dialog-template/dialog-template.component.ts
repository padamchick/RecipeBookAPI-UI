import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-template',
  templateUrl: './dialog-template.component.html',
  styleUrls: ['./dialog-template.component.less']
})
export class DialogTemplateComponent implements OnInit {
  @Input() width: number;
  @Input() title: string;
  @Input() button1Label: string;
  @Input() button2Label: string;
  @Input() button1Class: string;
  @Input() button2Class: string;
  @Input() buttonWidth: number;
  @Input() valid: boolean = true;

  @Output() button1Callback: EventEmitter<any> = new EventEmitter();
  @Output() button2Callback: EventEmitter<any> = new EventEmitter();
  @Output() closeButtonCallback: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  button1Click() {
    this.button1Callback.emit();
  }

  button2Click() {
    this.button2Callback.emit();
  }

  closeButtonClick() {
    this.closeButtonCallback.emit();
  }
}
