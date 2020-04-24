import { Component, OnInit } from '@angular/core';
import { EtudiantUpdateDto } from 'src/app/models/etudiant-update-dto';
import { NoteUpdateDto } from 'src/app/models/note-update-dto';
import { NotesService } from 'src/app/services/note/notes.service';

@Component({
  selector: 'app-all-note',
  templateUrl: './all-note.component.html',
  styleUrls: ['./all-note.component.css']
})
export class AllNoteComponent implements OnInit {
  allNote = new Array<NoteUpdateDto>();

  constructor(private service: NotesService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(
      (responseDto) => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.allNote = responseDto.body;
        }
      }
    );
  }

  delete(id: number) {
    this.service.delete(id).subscribe(
      responseDto => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.allNote = this.allNote.filter(
            element =>  element.id !== id
          );
        }
        console.log('result after delete: ', this.allNote);
      }
    );
  }

}
