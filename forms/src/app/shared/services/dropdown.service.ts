import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Cidade } from '../models/cidade';
import { EstadosBr } from '../models/estados-br';

@Injectable()
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr(){
    return this.http.get<EstadosBr[]>('assets/dados/estados.json').pipe();
  }

  getCidades(idEstado: number){
    return this.http.get<Cidade[]>('assets/dados/cidades.json').pipe(
      map((cidades: Cidade[]) => cidades.filter(c => c.estado == idEstado))
    );
  }

  getCargos(){
    return [
      {
        nome: 'dev', nivel: 'junior', desc: 'dev jr'
      },
      {
        nome: 'dev', nivel: 'pleno', desc: 'dev pl'
      },
      {
        nome: 'dev', nivel: 'senior', desc: 'dev sr'
      }
    ];
  }

  getTecnologias(){
    return [
      {
        nome: 'java', desc: 'java'
      },
      {
        nome: 'javascript', desc: 'javascript'
      },
      {
        nome: 'php', desc: 'php'
      },
      {
        nome: 'ruby', desc: 'ruby'
      }
    ];
  }

  getNewsletter(){
    return [
      {
        valor: 's', desc: 'Sim'
      },
      {
        valor: 'n', desc: 'Não'
      }
    ]
  }


}
