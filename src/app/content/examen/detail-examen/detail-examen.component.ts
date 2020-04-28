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
  notes = Array<number>();
  somme: number;
  moyenne: number;
  

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private serviceExamens: ExamensService,
    private serviceNotes: NotesService,
    
    
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

  afficherNotes(id: number) {
    this.tableauNotes = true;
    this.getNotes(id);
  }

  getNotes(id: number) {
    this.serviceNotes.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allNotes = responseDto.body;
          this.allNotesParExamen = this.allNotes.filter(element => element.examen.idExam == id);
          if (this.allNotesParExamen.length == 0) {
            this.messageNotes = 'Aucune note n\'est enregistrée pour cet examen.';
          } else {
              this.somme = 0;
              for (var i=0; i < this.allNotesParExamen.length; i++) {
              this.somme = this.somme + this.allNotesParExamen[i].value;
              };
              this.moyenne = this.somme/this.allNotesParExamen.length;
            this.messageNotes = 'Moyenne générale de l\'examen : ' +this.moyenne+ '/20';
          }
        }
      }
    )
  }

  retour() {
    this.location.back();
  }

}
