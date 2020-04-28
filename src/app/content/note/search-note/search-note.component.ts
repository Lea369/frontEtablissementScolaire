import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/note/notes.service';
import { NoteUpdateDto } from 'src/app/models/note-update-dto';

@Component({
  selector: 'app-search-note',
  templateUrl: './search-note.component.html',
  styleUrls: ['./search-note.component.css']
})
export class SearchNoteComponent implements OnInit {

  numero1: number;
  messageSucces1 = '';
  messageEchec1 = '';
  single1: boolean;
  note1 = new NoteUpdateDto();
  matiere2: string;
  messageSucces2 = '';
  messageEchec2 = '';
  single2: boolean;
  allNote2 = new Array<NoteUpdateDto>();
  allNote22 = new Array<NoteUpdateDto>();

  constructor(
    private serviceNotes: NotesService
  ) { }

  ngOnInit(): void {
    this.single1 = false;
    this.single2 = false;
  }

  getSingle1(numero: number) {
    this.serviceNotes.getNote(numero).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.single1 = true;
          this.note1 = responseDto.body;
          this.messageSucces1 = '1 note(s) trouvée(s).';
          this.messageEchec1 = '';
          this.single2 = false;
          this.messageSucces2 = '';
          this.messageEchec2 = '';
          this.allNote2 = [];
          this.allNote22 = [];
        }
      },
      (responseDto) => {
        if (responseDto.error) {
          this.single1 = false;
          this.note1 = null;
          this.messageEchec1 = 'Aucune note trouvée.';
          this.messageSucces1 = '';
          this.single2 = false;
          this.messageSucces2 = '';
          this.messageEchec2 = '';
          this.allNote2 = [];
          this.allNote22 = [];
        }
      }
    );
  }

  getSingle2(matiere: string) {
    this.serviceNotes.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allNote2 = responseDto.body;
          this.allNote22 = this.allNote2.filter(element => element.examen.matiereExamen.nomMatiere == matiere);
          if (this.allNote22.length == 0) {
            this.single2 = false;
            this.messageSucces2 = '';
            this.messageEchec2 = 'Aucune note trouvée.';
            this.allNote2 = [];
            this.allNote22 = [];
            this.single1 = false;
            this.note1 = null;
            this.messageEchec1 = '';
            this.messageSucces1 = '';
          } else {
            this.single2 = true;
            this.messageEchec2 = '';
            this.messageSucces2 = this.allNote22.length+ ' note(s) trouvée(s).';
            this.single1 = false;
            this.note1 = null;
            this.messageEchec1 = '';
            this.messageSucces1 = '';
          }
        }
      }
    );
  }

  delete(numero: number) {
    this.serviceNotes.delete(numero).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          if (this.single1) {
            this.getSingle1(this.numero1);
          }
          if (this.single2) {
            this.getSingle2(this.matiere2);
          }
        }
      }
    )
  }
}
