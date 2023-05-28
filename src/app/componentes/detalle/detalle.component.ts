import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
  providers: [ProjectService]
})

export class DetalleComponent implements OnInit {
  public url: string;
  public project: Project;
  public confirm: boolean;

  constructor(
  	private _projectService: ProjectService,
  	private _router: Router,
  	private _route: ActivatedRoute
  ){
  	this.url = Global.url;
    this.confirm = false;
    this.project = new Project('','','','',0,'','');
  }

  ngOnInit(){
  	this._route.params.subscribe(
      {
        next: (params) => {
          let id:any = params['id'];
          this.getProject(id);
        }
      }
  	);
  }

  
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

  
  //Funcion para borrar el proyecto
  deleteProject(id: any){
  	this._projectService.deleteProject(id).subscribe(
  		response => {
  			if(response.project){
  				this._router.navigate(['/proyectos']);
  			}
  		},
  		error => {
  			console.log(<any>error);
  		}
  	);
  }

  setConfirm(confirm: any){
    this.confirm = confirm;
  }


}
