import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
