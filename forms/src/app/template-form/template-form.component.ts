import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  onSubmit(form: Form){
    console.log(form);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
