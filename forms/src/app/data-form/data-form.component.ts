import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null),
    // })

    this.formulario = this.formBuilder.group({
      nome: [null],
      email: [null]
    })
  }

  onSubmit(){
    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
    .subscribe({
      next: (res) => console.log(res),
      error: (e) => alert('erro'),
      complete: () => this.formulario.reset()
    });
  }

  resetar(){
    this.formulario.reset();
  }

}
