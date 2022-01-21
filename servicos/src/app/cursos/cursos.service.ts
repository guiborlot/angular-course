import { Injectable } from "@angular/core";

@Injectable()
export class CursosService {

    private cursos: string[] = ['angular2', 'javascript', 'java']

    constructor(){
        console.log('cursossevice')
    }

    getCursos(){
        return this.cursos;
    }

    addCurso(curso: string){
        this.cursos.push(curso);
    }
}