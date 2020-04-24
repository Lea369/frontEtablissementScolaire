import { Component, OnInit} from '@angular/core';
import { NotesService } from 'src/app/services/note/notes.service';
import { NoteCreateDto } from 'src/app/models/note-create-dto';
import { ExamenUpdateDto } from 'src/app/models/examen-update-dto';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  note = new NoteCreateDto();
  messageValidation: string;

  constructor(private service: NotesService) { }

  ngOnInit(): void {
  }

  save() {
    this.service.create(this.note).subscribe(
      (responseDto) => {
        console.log('debug responseDto : ', responseDto);
        if (!responseDto.error) {
          this.messageValidation = responseDto.message;
        }
      }
    );
  }
}
