import { Component, OnInit } from '@angular/core';
import { NoteUpdateDto } from 'src/app/models/note-update-dto';
import { NotesService } from 'src/app/services/note/notes.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css']
})
export class UpdateNoteComponent implements OnInit {

  note = new NoteUpdateDto();
  formulaireModif: FormGroup;
  messageSucces = '';
  messageEchec = "";
  
  constructor(
    private serviceNotes: NotesService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getNote();
    this.formulaireModif = new FormGroup({
      value: new FormControl(this.note.value, [Validators.required, Validators.min(0), Validators.max(20)])
    })
  }

  getNote() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.serviceNotes.getNote(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.note = responseDto.body;
        }
      }
    )
  }

  update() {
    this.serviceNotes.update(this.note).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.messageSucces = "Modification réussie."
        }
      },
      (responseDto) => {
        if (responseDto.error) {
          this.messageEchec = "Erreur lors de la modification."
        }
      }
    )
  }

  retour() {
    this.location.back();
  }
}
