import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { Observable, Subject, EMPTY } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //cursos!: Curso[];
  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  bsModalRef?: BsModalRef;

  constructor(private service: CursosService, private alertService: AlertModalService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.service.list()
    //   .subscribe(dados => this.cursos = dados);

    this.onRefresh();
  }

  onRefresh() {
     this.cursos$ = this.service.list()
     .pipe(
       // map(),
       // tap(),
       // switchMap(),
       delay(2000),
       catchError(error => {
         console.error(error);
         //this.error$.next(true);
         this.handleError();
         return EMPTY;
       })
     );

  //    this.service.list()
  //    .pipe(
  //      catchError(error => empty())
  //    )
  //    .subscribe(
  //      dados => {
  //        console.log(dados);
  //      }
  //      // ,error => console.error(error),
  //     // () => console.log('Obserservable completo!')
  //    );
  // 
  }

  handleError(){
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger'
    // this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.'
  }

  onEdit(id: number){
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

}