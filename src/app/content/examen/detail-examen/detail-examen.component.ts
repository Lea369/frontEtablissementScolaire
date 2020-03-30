import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ExamenService } from 'src/app/services/examen/examen.service';
import { ExamenUpdateDto } from 'src/app/models/examen-update-dto';
import { MatiereUpdateDto } from 'src/app/models/matiere-update-dto';
import { MatiereService } from 'src/app/services/matiere/matiere.service';
import { NoteUpdateDto } from 'src/app/models/note-update-dto';
import { NoteService } from 'src/app/services/note/note.service';

@Component({
  selector: 'app-detail-examen',
  templateUrl: './detail-examen.component.html',
  styleUrls: ['./detail-examen.component.css']
})
export class DetailExamenComponent implements OnInit {

  examen: ExamenUpdateDto;
  notesForExam = new Array<NoteUpdateDto>();

  allMatiere = new Array<MatiereUpdateDto>();

  errMessage: string;
  editMode = false;

  toggle(): void {
    if(this.editMode){
      window.location.reload()
    } else {
      this.getAllMatieres();
      this.editMode = true;
    }
  }

  update(): void {
    this.service.update(this.examen).subscribe(
      responseDto => {
        if(!responseDto.error){
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

          if(responseError.status === 400){
            this.errMessage += responseError.error.message;
          }
      }
    );
  }

  private getNotes(){
    this.noteService.getAll().subscribe(
      responseDto => {
        this.notesForExam = responseDto.body.filter(
          note => {
              note.examen.idExam === this.examen.idExam;
          },
          noteErr => {
            console.log(noteErr);
          }
        )
      }
    )
  }

  private getAllMatieres(): void {
    this.matService.getAll().subscribe(
      responseDto => this.allMatiere = responseDto.body
    );
  }

}
