import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project'
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service'
import { Global } from '../../services/global';
import { Form } from '@angular/forms';
import { EMPTY, empty } from 'rxjs';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
  providers: [ ProjectService, UploadService]
})

export class CrearComponent {

  public title: string;
  public project: Project;
  public status: string;
  public archivosSubir: Array<File> = [];
  public ultimoProyectoCreado: Project = new Project('','','','', 0,'','');

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService

  )
  {
    this.title = "Crear proyecto";
    this.project = new Project('','','','',2019,'','');
    this.status = "";
      
  }

  ngOnInit(){
  }


  /*
  onSubmit(form: any ){
    console.log(this.project);
    this._projectService.saveProject(this.project).subscribe(
      Response => {
        if(Response.project)
        {
          //Subir la imagen
          //el id viene como resultado en la response.
          this._uploadService
          .makeFileRequest(Global.url+"upload-image/"+Response.project._id, [], this.archivosSubir, 'image')
          .then((result:any) => {
            //console.log("El result del AJAX dice: ")
            //console.log(result);
            this.ultimoProyectoCreado = result.project;
            //Cambia el la clase status a success
            this.status = "success";
            //Vacia el formulario
            form.reset();

          })
         
        }else{
          this.status = "failed";
        }
        console.log(Response);
      },
      Error =>{
        console.log(<any>Error);
      }
    )
  }
*/


onSubmit(form: any){
  console.log(this.project);
  //Llamamos al servicio que guarda proyectos.
  this._projectService.saveProject(this.project).subscribe(
  {
    next: (Response) => 
    {
      if(Response.project){
        //Subir la imagen // El id viene como resultado en la response.
        //Verificamos si hay un archivo a subir
        if(this.archivosSubir.length > 0){
          this._uploadService.makeFileRequest(Global.url+"upload-image/"+Response.project._id, [], this.archivosSubir, 'image')
          .then((result:any) => {
            //console.log("El result del AJAX dice: ")
            //console.log(result);
            this.ultimoProyectoCreado = result.project;
            //Cambia el la clase status a success
            this.status = "success";
            //Vacia el formulario
            form.reset();
          })
        }
        else{
          this.ultimoProyectoCreado = Response.project;
          //Cambia el la clase status a success
          this.status = "success";
          //Vacia el formulario
          form.reset();
        }
      }else{
        this.status = "failed";
      }
      console.log(Response);
    },
    error: (Error) =>{
      console.log(<any>Error);
    }


  })
}



  eventoCambioArchivo(archivoEntrada: any){
    //Esto es un cast para coonvertir archivoEntrada a un Array.
    console.log(archivoEntrada);
    this.archivosSubir = <Array<File>>archivoEntrada.target.files;
    console.log(this.archivosSubir);
  }

}
