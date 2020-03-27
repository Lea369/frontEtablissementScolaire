import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from 'src/app/models/response-dto';
import { Observable } from 'rxjs';
import { ClasseCreateDto } from 'src/app/models/classe-create-dto';
import { ClasseUpdateDto } from 'src/app/models/classe-update-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  private URL = environment.baseUrl + 'classe';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/all');
  }

  getClasse(id: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/one?id=' + id)
  }

  delete(id: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(this.URL + '?id=' + id);
  }

  create(classe: ClasseCreateDto): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.URL, classe);
  }

  update(classe: ClasseUpdateDto): Observable<ResponseDto> {
    return this.http.put<ResponseDto>(this.URL, classe);
  }
}
