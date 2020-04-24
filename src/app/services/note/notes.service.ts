import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from 'src/app/models/response-dto';
import { NoteCreateDto } from 'src/app/models/note-create-dto';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private URL = environment.baseUrl + 'note';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(this.URL + '/all');
  }

  delete(id: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(this.URL + '?id=' + id);
  }

  create(note: NoteCreateDto): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.URL, note);
  }
}


