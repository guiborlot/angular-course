import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: 'Guilherme',
    email: 'guilherme@email.com'
  }

  onSubmit(form: any){
    console.log(form.value);

    console.log(this.usuario);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
