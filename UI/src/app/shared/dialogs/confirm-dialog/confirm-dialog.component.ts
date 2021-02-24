import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.less']
})
export class ConfirmDialogComponent {

  width: number = 300;
  title: string;
  button1Label: string = 'Cancel';
  button2Label: string = 'Submit';
  button1Class = '';
  button2Class = 'theme-accent-dark';
  buttonWidth: number = 120;

  message: string;

  constructor(public dialog: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    data.title ? this.title = data.title : this.title;
    data.width ? this.width = data.width : this.width;
    data.button1Label ? this.button1Label = data.button1Label : this.button1Label;
    data.button2Label ? this.button2Label = data.button2Label : this.button2Label;
    data.button1Class ? this.button1Class = data.button1Class : this.button1Class;
    data.button2Class ? this.button2Class = data.button2Class : this.button2Class;
    data.buttonWidth ? this.buttonWidth = data.buttonWidth : this.buttonWidth;
    data.message ? this.message = data.message : ''

  }

  button1Callback() {
    this.hideDialog();
  }

  button2Callback() {
    this.dialog.close(true)
  }

  closeButtonCallback() {
    this.hideDialog();
  }

  hideDialog() {
    this.dialog.close(false);
  }
}
