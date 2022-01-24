import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlunosComponent } from './alunos.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunosRoutingModule } from './alunos.routing.module';


@NgModule({
    declarations: [AlunosComponent, AlunoFormComponent, AlunoDetalheComponent],
    imports: [CommonModule,
        AlunosRoutingModule],
    exports: [],
    providers: [],
})
export class AlunosModule { }