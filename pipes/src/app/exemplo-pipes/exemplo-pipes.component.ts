import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-exemplo-pipes',
  templateUrl: './exemplo-pipes.component.html',
  styleUrls: ['./exemplo-pipes.component.scss']
})
export class ExemploPipesComponent implements OnInit {

  livro: any = {
    titulo: 'O último desejo - The Witcher - A saga do bruxo Geralt de Rívia (capa dura)',
    rating: 4.81324,
    numeroPaginas: 318,
    preco: 39.02,
    dataLancamento: new Date(2019, 12, 19),
    url: 'https://www.amazon.com.br/dp/854690281X/ref=cm_sw_r_tw_dp_HBCKYQ7PZMPYWKCPGF8W via @amazonBR '
  }

  livros: string[] = ['java', 'angular 2'];

  filtro!: string;

  addCurso(valor: string){
    this.livros.push(valor)
    console.log(this.livros);
  }

  obterCursos(){
    if(this.livros.length === 0 || this.filtro === undefined || this.filtro.trim() === ''){
      return this.livros;
    }
    return this.livros.filter((v) => {
      if(v.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0) {
        return true
      }
      return false;
    });
  }

  valorAsync = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Valor assincrono'), 2000)
  });

  valorAsync2 = interval(2000).pipe(map(valor => 'Valor assincrono 2'));

  constructor() { }

  ngOnInit(): void {
  }

}
