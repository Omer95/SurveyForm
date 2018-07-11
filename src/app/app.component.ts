import { Component, OnInit } from '@angular/core';
import { ChildFormComponent } from './child-form/child-form.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  forms: ChildFormComponent[] = [];
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
    console.log(event);
  }
}
