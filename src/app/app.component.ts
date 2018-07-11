import { Component, OnInit } from '@angular/core';
import { ChildFormComponent } from './child-form/child-form.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  forms: ChildFormComponent[] = [];
  fields: FormlyFieldConfig[] = [];
  emitted = false;
  myForm = new FormGroup({});

  ngOnInit() {
    this.forms.push(new ChildFormComponent(new FormBuilder()));
  }
  addForm() {
    this.forms.push(new ChildFormComponent(new FormBuilder()));
  }
  deleteForm(index) {
    this.forms.splice(index, 1);
  }
  logChild(index) {
    console.log('child: ', index + 1);
  }
  log(event) {
    this.fields.push(event);
    console.log(this.fields);
    this.emitted = true;
  }
}
