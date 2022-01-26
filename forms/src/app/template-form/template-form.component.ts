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

  verificaValidTouched(campo: any){
    return !campo.valid && campo.touched;
  }

  aplicaInvalidErro(campo: any){
    return {
      'is-invalid': this.verificaValidTouched(campo)
    };
  }

  aplicaFeedbackErro(campo: any){
    return {
      'invalid-feedback': this.verificaValidTouched(campo)
    };
  }


}
