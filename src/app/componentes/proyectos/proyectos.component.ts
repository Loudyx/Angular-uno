import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Global } from 'src/app/services/global';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
  providers: [ProjectService]
})

export class ProyectosComponent {

  public projects: Project[] = [];
  public url: string;

  constructor(
  	private _projectService: ProjectService
  ){
  	this.url = Global.url;
    this.projects = [];
  }

  ngOnInit(){
  	this.getProjects();
  }



getProjects() {
  //Se usa esta forma del subscribe ya que la otra es deprecated
  this._projectService.getProjects().subscribe({
    next: (Response) => {
      if (Response.projects) {
        this.projects = Response.projects;
      }
    },
    error: (Error) => {
      console.log(Error);
    },
  });
}


/*
 getProjects(){
  	this._projectService.getProjects().subscribe(
  		Response => {
  			if(Response.projects){
  				this.projects = Response.projects;
  			}
  		},
  		Error => {
  			console.log(<any>Error);
  		}
  	);
  }

*/




}
