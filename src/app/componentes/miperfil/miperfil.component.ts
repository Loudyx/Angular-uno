import { Component } from '@angular/core';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})

export class MiperfilComponent {
  public titulo: string;
  public subtitulo: string;
  public email: string;


  constructor(){
    this.titulo = "Web de David";
    this.subtitulo = "Desarrollador web";
    this.email = "dav@gmail.com";
  }

}
