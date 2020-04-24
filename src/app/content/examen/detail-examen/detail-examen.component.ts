import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ExamensService } from 'src/app/services/examen/examens.service';
import { ExamenUpdateDto } from 'src/app/models/examen-update-dto';
import { NoteUpdateDto } from 'src/app/models/note-update-dto';
import { NotesService } from 'src/app/services/note/notes.service';

@Component({
  selector: 'app-detail-examen',
  templateUrl: './detail-examen.component.html',
  styleUrls: ['./detail-examen.component.css']
})
export class DetailExamenComponent implements OnInit {

  examen = new ExamenUpdateDto();
  allNotes = new Array<NoteUpdateDto>();
  allNotesParExamen = new Array<NoteUpdateDto>();
  tableauNotes: boolean;
  messageNotes= '';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private serviceExamens: ExamensService,
    private serviceNotes: NotesService
    
  ) { }

  ngOnInit(): void {
    this.getExamen();
  }

  getExamen(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.serviceExamens.getExamen(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.examen = responseDto.body;
        }
      }       
    );
  }

  afficherNotes(examen: ExamenUpdateDto) {
    this.tableauNotes = true;
    this.getNotes(examen);
  }

  getNotes(examen: ExamenUpdateDto) {
    this.serviceNotes.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allNotes = responseDto.body;
          this.allNotesParExamen = this.allNotes.filter(element => element.examen == examen);
          if (this.allNotesParExamen.length == 0) {
            this.messageNotes = 'Aucune note n\'est enregistrée pour cet examen';
          } else {
            this.messageNotes = '';
          }
        }
      }
    )
  }

  retour() {
    this.location.back();
  }

}
