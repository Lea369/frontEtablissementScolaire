import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from 'src/app/models/response-dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AbsenceCreateDto } from 'src/app/models/absence-create-dto';
import { AbsenceUpdateDto } from 'src/app/models/absence-update-dto';

@Injectable({
  providedIn: 'root'
})
export class AbsencesService {

  private URL = environment.baseUrl + 'absence';

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/all');
  }

  delete(id: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(this.URL + '?id=' + id);
  }

  create(absence: AbsenceCreateDto): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.URL, absence);
  }

  getAbsence(id: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/one?id=' + id);
  }

  updateAbsence(absence: AbsenceUpdateDto): Observable<any> {
    return this.http.put<ResponseDto>(this.URL, absence);
  }
}