import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private alunos: any[] = [
    {
      id: 1, nome: 'aluno 01', email: 'aluno01@gmail.com'
    },
    {
      id: 2, nome: 'aluno 02', email: 'aluno02@gmail.com'
    },
    {
      id: 3, nome: 'aluno 03', email: 'aluno03@gmail.com'
    }
  ];

  getAlunos(){
    return this.alunos;
  }

  getAluno(id: number){

    return this.alunos.find((out) =>
      out.id == id)
  }

  constructor() { }
}
