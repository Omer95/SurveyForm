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
  boxEditing: boolean[] = [];
  radioEditing: boolean[] = [];
  tempEditBox = '';
  editable = new FormControl([undefined, Validators.required]);
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
    this.boxEditing.push(false);
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
    if (this.boxItems.length === 0) {
      this.boxButton = false;
    }
  }
  deleteRadio(index) {
    this.radioItems = this.userForm.get('radios') as FormArray;
    this.radioItems.removeAt(index);
    if (this.radioItems.length === 0) {
      this.radioButton = false;
    }
  }
  editBox() {
    this.box = true;
    this.boxButton = true;
  }
  editABox(index) {
    this.boxEditing[index] = true;
  }
  editedABox(index) {
    this.boxItems = this.userForm.get('boxes') as FormArray;
    const value = this.editable.value;
    this.boxItems.setControl(index, new FormControl(value));
    this.boxEditing[index] = false;
    this.tempEditBox = '';
  }
  editRadio() {
    this.radio = true;
    this.radioButton = true;
  }
  editARadio(index) {
    this.radioEditing[index] = true;
  }
  editedARadio(index) {
    this.radioItems = this.userForm.get('radios') as FormArray;
    const value = this.editable.value;
    this.radioItems.setControl(index, new FormControl(value));
    this.radioEditing[index] = false;
    this.tempEditBox = '';
  }
  done() {
    if (this.box) {
      const output = {
        key: this.userForm.value.desc,
        type: 'multicheckbox',
        templateOptions: {
          label: this.userForm.value.desc,
          options: []
        }
      };
      this.boxItems = this.userForm.get('boxes') as FormArray;
      const len = this.boxItems.length;
      for (let i = 0; i < len; i++) {
        output.templateOptions.options.push({
          key: this.boxItems.at(i).value,
          value: this.boxItems.at(i).value
        });
      }
      // console.log('formly format', output);
      this.outputEvent.emit(output);
    } else {
      const output = {
        key: this.userForm.value.desc,
        type: 'radio',
        templateOptions: {
          label: this.userForm.value.desc,
          options: []
        }
      };
      this.radioItems = this.userForm.get('radios') as FormArray;
      const len = this.radioItems.length;
      for (let i = 0; i < len; i++) {
        output.templateOptions.options.push({
          key: this.radioItems.at(i).value,
          value: this.radioItems.at(i).value
        });
      }
      this.outputEvent.emit(output);
    }
    this.box = false;
    this.radio = false;
    this.radioButton = false;
    this.boxButton = false;
  }
}
