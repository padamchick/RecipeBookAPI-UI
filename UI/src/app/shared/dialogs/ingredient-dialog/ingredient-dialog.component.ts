import {Component, Inject, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.less']
})
export class IngredientDialogComponent {

  width: number = 300;
  title: string;
  button1Label: string = 'Cancel';
  button2Label: string = 'Submit';
  button1Class = '';
  button2Class = 'theme-accent-dark';
  buttonWidth: number = 120;

  name: string;
  amount: number;
  unit: string;
  id: number;

  constructor(public dialog: MatDialogRef<IngredientDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    data.title ? this.title = data.title : this.title;
    data.width ? this.width = data.width : this.width;
    data.button1Label ? this.button1Label = data.button1Label : this.button1Label;
    data.button2Label ? this.button2Label = data.button2Label : this.button2Label;
    data.button1Class ? this.button1Class = data.button1Class : this.button1Class;
    data.button2Class ? this.button2Class = data.button2Class : this.button2Class;
    data.buttonWidth ? this.buttonWidth = data.buttonWidth : this.buttonWidth;

    this.name = data.name;
    this.amount = data.amount;
    this.unit = data.unit;
  }

  button1Callback() {
    this.hideDialog();
  }

  button2Callback() {
    this.dialog.close({
      name: this.name,
      amount: this.amount,
      unit: this.unit
    })
  }

  closeButtonCallback() {
    this.hideDialog();
  }

  hideDialog() {
    this.dialog.close();
  }

}
