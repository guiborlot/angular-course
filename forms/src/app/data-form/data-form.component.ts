import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, of } from 'rxjs';
import { EstadosBr } from '../shared/models/estados-br';
import { DropdownService } from '../shared/services/dropdown.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;
  estados!: EstadosBr[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService
  ) { }

  ngOnInit(): void {

    this.estados = [];

    this.dropdownService.getEstadosBr().subscribe({
      next: (res) => {
        this.estados.push(res);
        console.log(res);
      }
    })

    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null),
    // })

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
    });
  }

  onSubmit() {

    if(this.formulario.valid){
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
        .subscribe({
          next: (res) => console.log(res),
          error: (e) => alert('erro'),
          complete: () => this.formulario.reset()
        });
    } else {
      this.verificaValidacoesForm(this.formulario);
    }

  }

  verificaValidacoesForm(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo)
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      if(controle instanceof FormGroup){
        console.log(controle);
        this.verificaValidacoesForm(controle);
      }
    })
  }

  resetar() {
    this.formulario.reset();
  }

  verificaValidTouched(campo: string) {
    return !this.formulario.get(campo)?.valid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty);
  }

  aplicaInvalidErro(campo: string) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    };
  }

  consultaCEP() {

    let cep = this.formulario.get('endereco.cep')?.value;
    cep = cep.replace(/\D/g, '');
    if (cep != "") {
      let validacep = /^[0-9]{8}$/;
      if (validacep.test(cep)) {

        this.resetaDadosForm();

        this.http.get(`//viacep.com.br/ws/${cep}/json`).subscribe(res => this.populaDadosForm(res));
      }
    }
  }

  populaDadosForm(dados: any) {

    this.formulario.patchValue({
      endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  resetaDadosForm(){
    this.formulario.patchValue({
      endereco: {
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    })
  }

}
