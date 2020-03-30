import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ExamenService } from 'src/app/services/examen/examen.service';
import { ExamenUpdateDto } from 'src/app/models/examen-update-dto';
import { MatiereUpdateDto } from 'src/app/models/matiere-update-dto';
import { MatiereService } from 'src/app/services/matiere/matiere.service';
import { NoteUpdateDto } from 'src/app/models/note-update-dto';
import { NoteService } from 'src/app/services/note/note.service';
import { NoteCreateDto } from 'src/app/models/note-create-dto';

@Component({
  selector: 'app-detail-examen',
  templateUrl: './detail-examen.component.html',
  styleUrls: ['./detail-examen.component.css']
})
export class DetailExamenComponent implements OnInit {

  examen: ExamenUpdateDto;
  newNote: NoteCreateDto;

  notesForExam = new Array<NoteUpdateDto>();
  allMatiere = new Array<MatiereUpdateDto>();

  errMessage: string;
  editMode = false; // Pour montrer update
  showCreate = false; // Pour montrer create note

  toggle(): void {
    if (this.editMode) {
      window.location.reload();
    } else {
      this.getAllMatieres();
      this.editMode = true;
    }
  }

  toggleCreate(): void {
    if (this.showCreate) {
      this.showCreate = false;
    } else {
      this.showCreate = true;
    }
  }

  create(): void {

    this.newNote.examen = this.examen;

    this.noteService.create(this.newNote).subscribe(
      responseDto => {
        if (!responseDto.error) {
          window.location.reload();
        }
      },

      responseError => {
        console.log(responseError);
        this.errMessage = "Erreur " + responseError.status + ".";

        if (responseError.status === 400) {
          this.errMessage += " Veuillez verifier les valeurs dans le formulaire."
        }

      }
    );

  }

  update(): void {
    this.service.update(this.examen).subscribe(
      responseDto => {
        if (!responseDto.error) {
          window.location.reload();
        } else {
          console.log(responseDto);
        }
      },
      responseError => {
        console.log(responseError);
      }
    );
  }

  deleteNote(id: number) {
    this.noteService.delete(id).subscribe(
      responseDto => {
        this.notesForExam = this.notesForExam.filter(
          note => note.id !== id
        )
      }
    );
  }

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private service: ExamenService,
    private matService: MatiereService,
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.getExamen();
  }

  private getExamen(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getExamen(id).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.examen = responseDto.body;
          // Si un exam existe, chercher les notes associés
          this.getNotes();
        }
      },
      responseError => {
        console.log(responseError);
        this.errMessage = "Erreur " + responseError.status + ": ";

        if (responseError.status === 400) {
          this.errMessage += responseError.error.message;
        }
      }
    );
  }

  private getNotes() {
    console.log("DEBUG GetNotes");
    this.noteService.getAll().subscribe(
      responseDto => {
        this.notesForExam = responseDto.body.filter(
          note => note.examen.idExam == this.examen.idExam
          )
          console.log(this.notesForExam);
      },
      noteErr => {
        console.log(noteErr);
      }
    )
  }

  private getAllMatieres(): void {
    this.matService.getAll().subscribe(
      responseDto => this.allMatiere = responseDto.body
    );
  }

}
