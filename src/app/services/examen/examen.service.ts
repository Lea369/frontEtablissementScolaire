import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { ExamenUpdateDto } from 'src/app/models/examen-update-dto';
import { ResponseDto } from 'src/app/models/response-dto';


@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  private URL = environment.baseUrl + 'examen';

  getAll(): Observable<ResponseDto>{
      return this.http.get<ResponseDto>(this.URL + '/all');
  } 

  delete(id: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(this.URL + '?id=' + id);
  }

  constructor(private http: HttpClient) { }
}
