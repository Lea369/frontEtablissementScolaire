import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExamenCreateDto } from 'src/app/models/examen-create-dto';
import { ExamensService } from 'src/app/services/examen/examens.service';
import { MatieresService } from 'src/app/services/matiere/matieres.service';
import { MatiereUpdateDto } from 'src/app/models/matiere-update-dto';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-examen',
  templateUrl: './create-examen.component.html',
  styleUrls: ['./create-examen.component.css']
})
export class CreateExamenComponent implements OnInit {

  formulaireAjout: FormGroup;
  examen = new ExamenCreateDto;
  allMatiere = new Array<MatiereUpdateDto>();
  emptyListe: boolean;
  messageSucces = '';
  messageEchec = '';

  constructor(
    private serviceExamens: ExamensService,
    private serviceMatieres: MatieresService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.emptyListe = false;
    this.getAllMatiere();
    this.formulaireAjout = new FormGroup({
      matiereExamen: new FormControl(this.examen.matiereExamen, Validators.required),
      dateExamen: new FormControl(this.examen.dateExamen, Validators.required),
      typeExamen: new FormControl(this.examen.typeExamen, Validators.required),
      coefExamen: new FormControl(this.examen.coefExamen, Validators.required),
    })
  }

  getAllMatiere() {
    this.serviceMatieres.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allMatiere = responseDto.body;
          if (this.allMatiere.length == 0) {
            this.emptyListe = true;
          } else {
            this.emptyListe = false;
          }
        }
      }
    )
  }

  save() {
    this.serviceExamens.create(this.examen).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.messageSucces = 'Création réussie.'; 
          this.messageEchec = '';
        }
      },
      (responseDto) => {
        if (responseDto.error) {
          this.messageEchec = 'Erreur lors de la création.'
          this.messageSucces = '';
        }
      }
    )
  }

  retour() {
    this.location.back();
  }
  
}
