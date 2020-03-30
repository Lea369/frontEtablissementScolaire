import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from 'src/app/models/response-dto';
import { Observable } from 'rxjs';
import { EtudiantCreateDto } from 'src/app/models/etudiant-create-dto';
import {environment} from 'src/environments/environment';
import { EtudiantUpdateDto } from 'src/app/models/etudiant-update-dto';

@Injectable({
  providedIn: 'root'
})
export class EtudiantsService {
  
 

  private URL = environment.baseUrl + 'etudiant';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/all');
  }

  getEtudiant(id: number) : Observable<ResponseDto>{
    return this.http.get<ResponseDto>(this.URL + '/one?id=' + id);
  }

  delete(id: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(this.URL + '?id=' + id);
  }

  create(etudiant: EtudiantCreateDto): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.URL, etudiant);
  }

  updateEtudiant (etudiant: EtudiantUpdateDto): Observable<any> {
    return this.http.put<ResponseDto>(this.URL, etudiant);
  }

  notes(email: string): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/note?email=' + email);
  }

  abs(email: string) {
    return this.http.get<ResponseDto>(this.URL + '/absence?email=' + email);
  }
}
