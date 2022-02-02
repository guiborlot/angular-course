import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Curso } from "./curso";
import { tap, delay, take } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: "root",
})
export class CursosService {
    private readonly API = `${environment.API}cursos`;

    constructor(private http: HttpClient) {}

    list() {
        //return this.http.get<Curso[]>(this.API);
        return this.http
            .get<Curso[]>(this.API)
            .pipe(delay(2000), tap(console.log));
    }

    loadByID(id: number) {
        return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1));
    }

    private create(curso: any) {
        return this.http.post(this.API, curso).pipe(take(1));
    }

    private update(curso: any){
        return this.http.put(`${this.API}/${curso.id}`, curso).pipe(take(1));
    }

    save(curso: any) {
        if (curso.id){
            return this.update(curso);
        }
        return this.create(curso);
    }
}
