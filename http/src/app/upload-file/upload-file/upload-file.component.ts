import { HttpEvent, HttpEventType } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { UploadFileService } from "../upload-file.service";

@Component({
    selector: "app-upload-file",
    templateUrl: "./upload-file.component.html",
    styleUrls: ["./upload-file.component.scss"],
})
export class UploadFileComponent implements OnInit {
    files!: Set<File>;
    progress = 0;

    constructor(private service: UploadFileService) {}

    ngOnInit(): void {}

    onChange(event: any) {
        console.log(event);

        const selectedFiles = <FileList>event.srcElement.files;
        this.files = new Set();
        for(let i = 0; i < selectedFiles.length; i++){
            this.files.add(selectedFiles[i])
        }

        this.progress = 0;
    }

    onUpload() {
        if (this.files && this.files.size > 0){
            this.service.upload(this.files, environment.BASE_URL + '/upload').subscribe((event: HttpEvent<Object>) => {
                //HttpEventType
                console.log(event);
                if(event.type === HttpEventType.Response){
                    console.log('upload concluido');
                } else if(event.type === HttpEventType.UploadProgress && event.total != null){
                    const percentDone = Math.round((event.loaded * 100) / event.total);
                    console.log('Progresso', percentDone);
                    this.progress = percentDone;
                }
            });
        }
    }
}
