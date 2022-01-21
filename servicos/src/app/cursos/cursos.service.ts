import { Injectable } from "@angular/core";

@Injectable()
export class CursosService {

    

    getCursos(){
        return ['angular2', 'javascript', 'java'];
    }
}