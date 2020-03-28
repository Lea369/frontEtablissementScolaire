import { Component, OnInit } from '@angular/core';
import { ExamenUpdateDto } from 'src/app/models/examen-update-dto';
import { ExamenService } from '../../../services/examen/examen.service';
import { ResponseDto } from 'src/app/models/response-dto';
import { ExamenCreateDto } from 'src/app/models/examen-create-dto';
import { MatiereService } from 'src/app/services/matiere/matiere.service';
import { MatiereUpdateDto } from 'src/app/models/matiere-update-dto';
import { TypeEnum } from 'src/app/enums/type-enum.enum';

@Component({
  selector: 'app-all-examen',
  templateUrl: './all-examen.component.html',
  styleUrls: ['./all-examen.component.css']
})
export class AllExamenComponent implements OnInit {

  showCreate = false;
  messageEchec: string;

  allExamen = new Array<ExamenUpdateDto>();
  allMatiere = new Array<MatiereUpdateDto>();

  newExam = new ExamenCreateDto();

  toggle() {
    if (this.showCreate) {
      this.showCreate = false;
    } else {
      this.showCreate = true;
    }
  }

  create() {

    if (this.newExam.dateExamen && this.newExam.matiereExamen && this.newExam.typeExamen && this.newExam.coefExamen) {

      this.service.create(this.newExam).subscribe(
        responseDto => {
          if (!responseDto.error) {
            this.getAllExamens();
            this.showCreate = false;
          }
        },

        responseError => {
          console.log(responseError);
          this.messageEchec = "Erreur " + responseError.status + ".";

          if (responseError.status === 400) {
            this.messageEchec += " Veuillez verifier les valeurs dans le formulaire."
          }

        }
      );
    } else {
      this.messageEchec = "Veuillez remplir tous les champs pour enregistrer l'examen."
    }
  }

  delete(id: number) {
    this.service.delete(id).subscribe(
      responseDto => {
        this.allExamen = this.allExamen.filter(
          exam => exam.idExam !== id
        )
      }
    );
  }

  constructor(private service: ExamenService, private matService: MatiereService) { }

  ngOnInit(): void {
    this.getAllExamens();
    this.getAllMatieres();
  }

  private getAllExamens(): void {
    this.service.getAll().subscribe(
      responseDto => this.allExamen = responseDto.body
    );
  }

  private getAllMatieres(): void {
    this.matService.getAll().subscribe(
      responseDto => this.allMatiere = responseDto.body
    );
  }

}
