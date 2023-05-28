import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { Global } from './global';

@Injectable()
export class ProjectService{
	public url:string;

	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	}

	testService(){
		return 'Probando el servicio de Angular';
	}
	
	saveProject(project: Project): Observable<any>{
		let params = JSON.stringify(project);
		let headers = new HttpHeaders().set('Content-Type','application/json');

		return this._http.post(this.url+'save-project', params, {headers: headers});
	}
	
	
	getProjects(): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'projects', {headers: headers});
	}
	
	//Este lo manda a llamar El componente Detalle
	//Usa project/'+id porque en el backend de la api, requiere ese link.
	getProject(id: any): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.get(this.url+'project/'+id, {headers: headers});
	}

	
	deleteProject(id: any): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		return this._http.delete(this.url+'project/'+id, {headers: headers});
	}

	//Esta funcion se usa en el Componente de Editar.
	updateProject(project: Project): Observable<any>{
		//Aqui convertimos el project a un JSON para enviarlo como parametro.
		let params = JSON.stringify(project);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

		//Recuerda que actualizar usa metodo PUT
		//En los params se envia el objeto project.
		return this._http.put(this.url+'project/'+project._id, params, {headers: headers});
	}
	
}