import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExamenUpdateDto } from 'src/app/models/examen-update-dto';
import { ExamensService } from 'src/app/services/examen/examens.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatieresService } from 'src/app/services/matiere/matieres.service';
import { MatiereUpdateDto } from 'src/app/models/matiere-update-dto';

@Component({
  selector: 'app-update-examen',
  templateUrl: './update-examen.component.html',
  styleUrls: ['./update-examen.component.css']
})
export class UpdateExamenComponent implements OnInit {

  formulaireModif: FormGroup;
  examen = new ExamenUpdateDto();
  allMatiere = new Array<MatiereUpdateDto>();
  emptyListeMatiere: boolean;
  messageSucces = '';
  messageEchec = '';

  constructor(
    private serviceExamens: ExamensService,
    private serviceMatieres: MatieresService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.emptyListeMatiere = true;
    this.getExamen();
    this.getAllMatiere();
    this.formulaireModif = new FormGroup({
      matiereExamen: new FormControl (this.examen.matiereExamen, Validators.required),
      dateExamen: new FormControl (this.examen.dateExamen, Validators.required),
      typeExamen: new FormControl(this.examen.typeExamen, Validators.required),
      coefExamen: new FormControl(this.examen.coefExamen, Validators.required),

    })
  }

  getExamen() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.serviceExamens.getExamen(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.examen = responseDto.body;
        }
      }
    )
  }

  getAllMatiere() {
    this.serviceMatieres.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allMatiere = responseDto.body;
          if (this.allMatiere.length == 0) {
            this.emptyListeMatiere = true;
          } else {
            this.emptyListeMatiere = false;
          }
        }
      }
    )
  }

  update() {
    this.serviceExamens.update(this.examen).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.messageSucces = 'Modification réussie.';
          this.messageEchec = '';
        }
      },
      (responseDto) => {
        if (responseDto.error) {
          this.messageSucces = '';
          this.messageEchec = 'Erreur lors de la modification.';
        }
      }
    )
  }

  retour() {
    this.location.back();
  }
}
