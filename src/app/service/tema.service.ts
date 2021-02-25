import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(
    private http: HttpClient
  ) {}

  token = {
    headers: new HttpHeaders().set('Authorization',environment.token ) //valor eh oq tiver em environment.token
  }

  getAllTema(): Observable<Tema[]> { //colocar [] pois trará um array de objetos tema
    return this.http.get<Tema[]>('http://localhost:8080/tema', this.token) //colocar o end point igual do back end
                                                              //this.token é a validação
  }

  postTema(tema: Tema): Observable<Tema>{ 
    return this.http.post<Tema>('http://localhost:8080/tema', tema, this.token)
    //o objeto criado em tema sera registrado no end point acima
  }
}
