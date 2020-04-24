import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { ExamenCreateDto } from 'src/app/models/examen-create-dto';
import { ResponseDto } from 'src/app/models/response-dto';
import { ExamenUpdateDto } from 'src/app/models/examen-update-dto';


@Injectable({
  providedIn: 'root'
})
export class ExamensService {

  private URL = environment.baseUrl + 'examen';

  getAll(): Observable<ResponseDto>{
      return this.http.get<ResponseDto>(this.URL + '/all');
  } 

  getExamen(id: number): Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.URL + '/one?id=' + id);
  }

  delete(id: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(this.URL + '?id=' + id);
  }

  create(exam: ExamenCreateDto): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.URL, exam);
  }

  update(exam: ExamenUpdateDto): Observable<ResponseDto>{
    return this.http.put<ResponseDto>(this.URL, exam);
  }

  constructor(private http: HttpClient) { }
}
