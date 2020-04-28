import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from 'src/app/models/response-dto';
import { NoteCreateDto } from 'src/app/models/note-create-dto';
import { NoteUpdateDto } from 'src/app/models/note-update-dto';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private URL = environment.baseUrl + 'note';

  constructor(private http: HttpClient) { }

  create(note: NoteCreateDto): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.URL, note);
  }

  update(note: NoteUpdateDto): Observable<ResponseDto> {
    return this.http.put<ResponseDto>(this.URL, note);
  }

  delete(id: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(this.URL + '?id=' + id);
  }

  getAll(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/all');
  }

  getNote(id: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/one?id=' + id);
  }

  

  
}


