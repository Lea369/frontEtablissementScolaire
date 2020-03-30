import { Component, OnInit } from '@angular/core';
import { ExamenUpdateDto } from 'src/app/models/examen-update-dto';
import { ExamenService } from '../../../services/examen/examen.service';
import { ResponseDto } from 'src/app/models/response-dto';
import { ExamenCreateDto } from 'src/app/models/examen-create-dto';
import { MatiereService } from 'src/app/services/matiere/matiere.service';
import { MatiereUpdateDto } from 'src/app/models/matiere-update-dto';
import { TypeEnum } from 'src/app/enums/type-enum.enum';
import { AbsenceUpdateDto } from 'src/app/models/absence-update-dto';
import { AbsenceCreateDto } from 'src/app/models/absence-create-dto';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';
import { AbsencesService } from 'src/app/services/absence/absences.service';
import { EtudiantCreateDto } from 'src/app/models/etudiant-create-dto';

@Component({
  selector: 'app-all-absence',
  templateUrl: './all-absence.component.html',
  styleUrls: ['./all-absence.component.css']
})
export class AllAbsenceComponent implements OnInit {

  showCreate = false;
  messageEchec: string;

  allAbsence = new Array<AbsenceUpdateDto>();
  allEtudiant = new Array<AbsenceUpdateDto>();

  newAbsence = new AbsenceCreateDto();
  newEtudiant = new EtudiantCreateDto();

  toggle() {
    if (this.showCreate) {
      this.showCreate = false;
    } else {
      this.showCreate = true;
    }
  }

  create() {

    if (this.newAbsence.dateStart && this.newAbsence.dateEnd && this.newAbsence.etudiant && this.newAbsence.justif && this.newAbsence.descript) {

      this.service.create(this.newAbsence).subscribe(
        responseDto => {
          if (!responseDto.error) {
            this.getAllAbsences();
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
      this.messageEchec = "Veuillez remplir tous les champs pour enregistrer l'absence'."
    }
  }

  delete(id: number) {
    this.service.delete(id).subscribe(
      responseDto => {
        this.allAbsence = this.allAbsence.filter(
          absence => absence.identifiant !== id
        )
      }
    );
  }

  constructor(private service: AbsencesService, private etuService: EtudiantsService) { }

  ngOnInit(): void {
    this.getAllAbsences();
    this.getAllEtudiants();
  }

  private getAllAbsences(): void {
    this.service.getAll().subscribe(
      responseDto => this.allAbsence = responseDto.body
    );
  }

  private getAllEtudiants(): void {
    this.etuService.getAll().subscribe(
      responseDto => this.allEtudiant = responseDto.body
    );
  }

}
