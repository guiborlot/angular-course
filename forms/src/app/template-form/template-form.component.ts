import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null,
    cep: null,
    numero: null,
    complemento: null
  }

  onSubmit(form: any){
    console.log(form.value);

    console.log(this.usuario);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
