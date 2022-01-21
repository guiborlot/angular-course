import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CursosService } from '../cursos/cursos.service';
import { ReceberCursoCriadoComponent } from '../receber-curso-criado/receber-curso-criado.component';
import { CriarCursoComponent } from './criar-curso.component';

@NgModule({
  declarations: [
    CriarCursoComponent,
    ReceberCursoCriadoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CriarCursoComponent],
  //providers: [CursosService]
})
export class CriarCursoModule { }
