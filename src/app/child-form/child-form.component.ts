import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Payload } from '../payload';

@Component({
  selector: 'app-child-form',
  templateUrl: './child-form.component.html',
  styleUrls: ['./child-form.component.css']
})
export class ChildFormComponent implements OnInit {
  radio = false;
  box = false;
  title = 'app';
  userForm: FormGroup;
  constructor(private fb: FormBuilder) {}
  selected = false;
  index = 0;
  boxItems;
  radioItems;
  boxButton = false;
  radioButton = false;
  description: string;
  @Output() outputEvent = new EventEmitter();

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.userForm = this.fb.group({
      desc: [undefined, Validators.required],
      select: [undefined, Validators.required],
      boxVal: [undefined, Validators.required],
      radioVal: [undefined, Validators.required],
      boxes: this.fb.array([]),
      radios: this.fb.array([])
    });
  }
  addBox() {
    this.boxItems = this.userForm.get('boxes') as FormArray;
    this.boxItems.push(new FormControl(this.userForm.get('boxVal').value));
    this.boxButton = true;
  }
  addRadio() {
    this.radioItems = this.userForm.get('radios') as FormArray;
    this.radioItems.push(new FormControl(this.userForm.get('radioVal').value));
    this.radioButton = true;
  }
  select() {
    if (this.userForm.get('select').value === 'checkBox') {
      this.box = true;
    } else {
      this.radio = true;
    }
    this.selected = true;
    this.description = this.userForm.get('desc').value;
  }
  deleteBox(index) {
    this.boxItems = this.userForm.get('boxes') as FormArray;
    this.boxItems.removeAt(index);
  }
  deleteRadio(index) {
    this.radioItems = this.userForm.get('radios') as FormArray;
    this.radioItems.removeAt(index);
  }
  editBox() {
    this.box = true;
    this.boxButton = true;
  }
editRadio() {
  this.radio = true;
  this.radioButton = true;
}
  done() {
    if (this.box) {
      // console.log(this.userForm.get('boxes').value);
      // console.log((new Payload('checkbox', this.description, this.userForm.get('boxes').value)));
      this.outputEvent.emit(new Payload('checkbox', this.description, this.userForm.get('boxes').value));
    } else {
      // console.log(this.userForm.get('radios').value);
      // console.log((new Payload('radio', this.description, this.userForm.get('radios').value)));
      this.outputEvent.emit(new Payload('radio', this.description, this.userForm.get('radios').value));
    }
    this.box = false;
    this.radio = false;
    this.radioButton = false;
    this.boxButton = false;
  }
}
