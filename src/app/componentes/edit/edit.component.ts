import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-edit',
  //Ruta original ->   templateUrl: './edit.component.html',
  //La cambiamos por la de la vista de Crear Component (en lugar de eso, preferi copiar y pegar el codigo).
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})


export class EditComponent implements OnInit {
	public title: string;
	public project: Project = new Project('','','','',0,'','');
	public ultimoProyectoCreado: Project = new Project('','','','', 0,'','');
	public status: string = "";
  //Esto contiene los archivos a subir
	public filesToUpload: Array<File> = [];
	public url: string;

	constructor(
		private _projectService: ProjectService,
		private _uploadService: UploadService,
    //Esto es necesario para poder obtener los params en el OnInit
		private _route: ActivatedRoute,
		private _router: Router
	){
		this.title = "Editar proyecto";
		this.url = Global.url;
	}

  //Se ejecuta al instanciar este componente.
  //En este caso, automaticamente obtiene el ID de la ruta y ejecuta a getProject();
  ngOnInit(){
  	this._route.params.subscribe(params => {
      console.log("Se instacion el editar")
  		let id = params['id'];
  		this.getProject(id);
  	});
  }

  //Recibe el ID y asigna el project a la variable "project" de esta instancia.
  getProject(id: any){
  	this._projectService.getProject(id).subscribe(
  		response => {
  			this.project = response.project;
  		},
  		error => {
  			console.log(<any>error);
  		}
  	)
  }

  onSubmit(){
  	this._projectService.updateProject(this.project).subscribe(
		response => {
  			if(response.project){
          // Subir la imagen si filesToUpload tiene algo.
          if(this.filesToUpload.length > 0){
            this._uploadService.makeFileRequest(Global.url+"upload-image/"+response.project._id, [], this.filesToUpload, 'image')
            .then((result:any) => {
              this.ultimoProyectoCreado = result.project;
              this.status = 'success';
            });
          }else{
            this.ultimoProyectoCreado = response.project;
            this.status = 'success';
          }
        }else{
          this.status = 'failed';
        }},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

	eventoCambioArchivo(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}




}
