import { Component, OnInit } from '@angular/core';
import { NoteUpdateDto } from 'src/app/models/note-update-dto';
import { NotesService } from 'src/app/services/note/notes.service';

@Component({
  selector: 'app-all-note',
  templateUrl: './all-note.component.html',
  styleUrls: ['./all-note.component.css']
})
export class AllNoteComponent implements OnInit {

  allNote = new Array<NoteUpdateDto>();

  constructor(private serviceNotes: NotesService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.serviceNotes.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allNote = responseDto.body;
        }
      }
    );
  }

  delete(id: number) {
    this.serviceNotes.delete(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
         this.getAll();
        }
      }
    );
  }

}
