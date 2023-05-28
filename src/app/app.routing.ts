import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule} from "@angular/router";



//Importamos los componentes que tendran la ruta.
import { MiperfilComponent } from './componentes/miperfil/miperfil.component';
import { GaleriaComponent } from './componentes/galeria/galeria.component';
import { CrearComponent } from './componentes/crear/crear.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { DetalleComponent } from "./componentes/detalle/detalle.component";
import { EditComponent } from "./componentes/edit/edit.component";

//Definimos las rutas URL
const appRoutes: Routes = [
    {path: "", component: MiperfilComponent}, //Esta es la Home
    {path: "sobre-mi", component: MiperfilComponent},
    {path: "proyectos", component: ProyectosComponent},
    {path: "crear", component: CrearComponent},
    {path: "galeria", component: GaleriaComponent},
    {path: "detalle/:id", component: DetalleComponent},
    {path: "editar-proyecto/:id", component: EditComponent},
    {path: "**", component: MiperfilComponent},//Ruta 404 para cuando no se cargue ninguna por error.
]

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
export const appRoutingProvides: any[] = [];

