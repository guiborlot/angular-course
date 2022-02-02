import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs";
import { AlertModalService } from "src/app/shared/alert-modal.service";
import { Curso } from "../curso";
import { CursosService } from "../cursos.service";

@Component({
	selector: "app-cursos-form",
	templateUrl: "./cursos-form.component.html",
	styleUrls: ["./cursos-form.component.scss"],
})
export class CursosFormComponent implements OnInit {
	form!: FormGroup;
	submitted = false;

	constructor(
		private fb: FormBuilder,
		private service: CursosService,
		private modal: AlertModalService,
		private location: Location,
		private route: ActivatedRoute
	) { }

	ngOnInit(): void {
		// this.route.params.subscribe(
		//   (params: any) => {
		//     const id = params.id['id'];
		//     console.log(id);
		//     const curso$ = this.service.loadByID(id);
		//     curso$.subscribe(curso => {
		//       this.updateForm(curso);
		//     });
		//   }
		// );

		this.route.params
			.pipe(
				map((params: any) => params["id"]),
				switchMap((id) => this.service.loadByID(id))
			)
			.subscribe((curso) => this.updateForm(curso));

		this.form = this.fb.group({
			id: [null],
			nome: [
				null,
				[
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(250),
				],
			],
		});
	}

	updateForm(curso: any) {
		this.form.patchValue({
			id: curso.id,
			nome: curso.nome,
		});
	}

	hasError(field: string) {
		return this.form.get(field)?.errors;
	}

	onSubmit() {
		this.submitted = true;
		console.log(this.form.value);
		if (this.form.valid) {
			console.log("submit");
			this.service.create(this.form.value).subscribe({
				next: () => {
					this.modal.showAlertSuccess("Criado com successo.");
					this.location.back();
				},
				error: () =>
					this.modal.showAlertDanger("Erro ao criar curso, tente novamente!"),
				complete: () => console.log("request completo"),
			});
		}
	}

	onCancel() {
		this.submitted = false;
		this.form.reset();
		//console.log('oncancel');
	}
}
