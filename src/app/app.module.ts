import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//Importamos estos para que funcione el api, no olvides ponerlos en "imports" abajo.
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

//Importamos el directorio de rutas
import { routing, appRoutingProvides } from './app.routing';


import { AppComponent } from './app.component';
import { MiperfilComponent } from './componentes/miperfil/miperfil.component';
import { GaleriaComponent } from './componentes/galeria/galeria.component';
import { CrearComponent } from './componentes/crear/crear.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';
import { EditComponent } from './componentes/edit/edit.component';


//Todo lo importado arriba va en alguna parte de aqui abajo.
@NgModule({
  //Aqui los componentes
  declarations: [
    AppComponent,
    MiperfilComponent,
    GaleriaComponent,
    CrearComponent,
    ProyectosComponent,
    DetalleComponent,
    EditComponent
  ],
  //Aqui los modulos
  imports: [
    BrowserModule,
    routing, //Se importa aqui porque es un moodulo
    HttpClientModule,
    FormsModule
  ],
  //Aqui los providers.
  providers: [
    appRoutingProvides
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
