import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { FormValidation } from '../shared/form-validation';
import { EstadosBr } from '../shared/models/estados-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { VerificaEmailService } from './services/verifica-email.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;
  //estados!: EstadosBr[];
  estados!: Observable<EstadosBr[]>;
  cargos!: any[];
  tecnologias!: any[];
  newsletterOp!: any[];

  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
  ) { }

  ngOnInit(): void {

    //this.verificaEmailService.verificarEmail('email1@email.com').subscribe();

    this.estados = this.dropdownService.getEstadosBr();

    this.cargos = this.dropdownService.getCargos();

    this.tecnologias = this.dropdownService.getTecnologias();

    this.newsletterOp = this.dropdownService.getNewsletter();

    // this.dropdownService.getEstadosBr().subscribe({
    //   next: (res) => {
    //     this.estados = res;
    //   }
    // })

    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null),
    // })

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email], this.validarEmail.bind(this)],
      confirmarEmail: [null, [FormValidation.equalsTo('email')]],

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidation.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),

      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.requiredTrue],
      frameworks: this.buildFrameworks()
    });
  }

  buildFrameworks() {

    const values = this.frameworks.map(v => new FormControl(false));

    return this.formBuilder.array(values, FormValidation.requiredMinCheckbox(1));
  }

  onSubmit() {

    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
      .map((v: any, i: number) => v ? this.frameworks[i] : null)
      .filter((v: any) => v !== null)
    });

    console.log(valueSubmit);

    if(this.formulario.valid){
      this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
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

    if (cep != null && cep !== ''){
      this.cepService.consultaCEP(cep)?.subscribe(dados => this.populaDadosForm(dados));
    }
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

  setarCargo(){
    const cargo = { nome: 'dev', nivel: 'junior', desc: 'dev jr' };
    this.formulario.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1: any, obj2: any){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  comparartecnologias(obj1: any, obj2: any){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  setarTecnologias(){
    this.formulario.get('tecnologias')?.setValue(['java', 'javascript', 'php']);
  }

  getFrameworksControls() {
    return this.formulario.get('frameworks') ? (<FormArray>this.formulario.get('frameworks')).controls : null;
  }

  validarEmail(formControl: FormControl){
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null));
  }

}
