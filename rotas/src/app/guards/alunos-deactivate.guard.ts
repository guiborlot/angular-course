import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AlunoFormComponent } from '../alunos/aluno-form/aluno-form.component';

// Consider using this interface for all CanDeactivate guards,
// and have your components implement this interface, too.
//
//   e.g. export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
//
// export interface CanComponentDeactivate {
// canDeactivate: () => any;
// }

@Injectable()
export class AlunosDeactivateGuard implements CanDeactivate<AlunoFormComponent> {
    canDeactivate(
        component: AlunoFormComponent,
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {

        console.log('guarda de desativação');

        return component.podeMudarRota();
    }
}