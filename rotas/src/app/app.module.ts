import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import { AlunosModule } from './alunos/alunos.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { CursosModule } from './cursos/cursos.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
//import { AlunosComponent } from './alunos/alunos.component';
// import { CursosComponent } from './cursos/cursos.component';
// import { CursoDetalheComponent } from './cursos/curso-detalhe/curso-detalhe.component';
// import { CursosService } from './cursos/cursos.service';
// import { CursoNaoEncontradoComponent } from './cursos/curso-nao-encontrado/curso-nao-encontrado.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    //AlunosComponent,
    //CursosComponent,
    //CursoDetalheComponent,
    //CursoNaoEncontradoComponent
  ],
  imports: [
    BrowserModule,
    //CursosModule,
    //AlunosModule,
    AppRoutingModule
  ],
  providers: [
  //  CursosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
