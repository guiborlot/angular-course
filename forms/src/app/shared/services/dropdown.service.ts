import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { EstadosBr } from '../models/estados-br';

@Injectable()
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr(){
    return this.http.get<EstadosBr[]>('assets/dados/estadosbr.json').pipe();
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
}
