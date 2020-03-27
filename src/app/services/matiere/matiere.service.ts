import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from 'src/app/models/response-dto';
import { Observable } from 'rxjs';
import { MatiereCreateDto } from 'src/app/models/matiere-create-dto';
import {environment} from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  private URL = environment.baseUrl + 'matiere';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/all');
  }

  delete(id: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(this.URL + '?id=' + id);
  }

  create(matiere: MatiereCreateDto): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.URL, matiere);
  }

}
