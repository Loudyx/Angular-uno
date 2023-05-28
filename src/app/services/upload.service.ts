import { Injectable } from '@angular/core';
import { Global } from './global';

@Injectable()
export class UploadService{
	public url: string;

	constructor(){
		this.url = Global.url;
	}

	makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string){
		return new Promise(function(resolve, reject){
			//Con esto creamos un "cuerpo" de la Request para la imagen (un form)
			var formData:any = new FormData();
			var xhr = new XMLHttpRequest();

			//Con esto le ponemos la imagen al form de la request
			for(var i = 0; i < files.length; i++){
				formData.append(name, files[i], files[i].name);
			}
			
			//Con esto creamos la solicitus AJAX para enviar la informacion
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
				}
			}

			//Con esto configuramos que se envia por POST, a donde se enviaa y TRUE para decir que se envie.
			xhr.open('POST', url, true);
			//Con esto enviamos el FORM que creamos ya con los datos.
			xhr.send(formData);
		});
	}

}