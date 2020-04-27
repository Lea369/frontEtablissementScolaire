import { Component, OnInit} from '@angular/core';
import { NotesService } from 'src/app/services/note/notes.service';
import { NoteCreateDto } from 'src/app/models/note-create-dto';
import { ExamenUpdateDto } from 'src/app/models/examen-update-dto';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';
import { ExamensService } from 'src/app/services/examen/examens.service';
import { EtudiantUpdateDto } from 'src/app/models/etudiant-update-dto';
import { MatieresService } from 'src/app/services/matiere/matieres.service';
import { FormGroup } from '@angular/forms';
import { MatiereUpdateDto } from 'src/app/models/matiere-update-dto';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  note = new NoteCreateDto();
  allEtudiant = new Array<EtudiantUpdateDto>();
  emptyListeEtudiant: boolean;
  allExamen = new Array<ExamenUpdateDto>();
  allExamenBis = new Array<ExamenUpdateDto>();
  allExamenParMatiere = new Array<ExamenUpdateDto>();
  emptyListeExamen: boolean;
  emptyListeExamenParMatiere: boolean;
  matiere: MatiereUpdateDto;
  allEtudiantBis = new Array<EtudiantUpdateDto>();
  allEtudiantParMatiere = new Array<EtudiantUpdateDto>();
  emptyListeEtudiantParMatiere: boolean;
  formulaireAjout: FormGroup;
  messageSucces = '';
  messageEchec = '';

  constructor(
    private serviceNotes: NotesService,
    private serviceEtudiants: EtudiantsService,
    private serviceExamens: ExamensService,
    private serviceMatieres: MatieresService
    ) { }

  ngOnInit(): void {
    this.emptyListeEtudiant = true;
    this.emptyListeExamen = true;
    this.emptyListeExamenParMatiere = true;
    this.emptyListeEtudiantParMatiere = true;
    this.getAllEtudiant();
    this.getAllExamen();
    
  }

  getAllEtudiant() {
    this.serviceEtudiants.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allEtudiant = responseDto.body;
          if (this.allEtudiant.length == 0) {
            this.emptyListeEtudiant = true;
          } else {
            this.emptyListeEtudiant = false;
          }
        }
      }
    );
  }

  getAllExamen() {
    this.serviceExamens.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allExamen = responseDto.body;
          if (this.allExamen.length == 0) {
            this.emptyListeExamen= true;
          } else {
            this.emptyListeExamen = false;
            this.allExamenBis = this.allExamen.filter(
              (item, i, arr) => arr.findIndex((t) => t.matiereExamen.nomMatiere === item.matiereExamen.nomMatiere) === i);
            console.log(this.allExamenBis);
          }
        }
      }
    );
  }

  chooseMatiere(matiere: MatiereUpdateDto) {
    this.serviceMatieres.getExamens(matiere.nomMatiere).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allExamenParMatiere = responseDto.body;
          if (this.allExamenParMatiere.length == 0) {
            this.emptyListeExamenParMatiere = true;
          } else {
            this.emptyListeExamenParMatiere = false;
          }
          this.allEtudiantParMatiere = this.matiere.listeEtudiant;
          if (this.allEtudiantParMatiere.length == 0) {
            this.emptyListeEtudiantParMatiere = true;
          } else {
            this.emptyListeEtudiantParMatiere = false;
          }
        }
      }
    )
  }

  save() {
    this.serviceNotes.create(this.note).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.messageSucces = 'Création réussie.'
        }
      },
      (responseDto) => {
        if (responseDto.error) {
          this.messageEchec = 'Erreur lors de la création.'
        }
      }
    );
  }

  
}
