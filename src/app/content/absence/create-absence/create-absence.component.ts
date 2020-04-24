import { Component, OnInit } from '@angular/core';
import { AbsenceCreateDto } from 'src/app/models/absence-create-dto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbsencesService } from 'src/app/services/absence/absences.service';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';
import { EtudiantUpdateDto } from 'src/app/models/etudiant-update-dto';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-absence',
  templateUrl: './create-absence.component.html',
  styleUrls: ['./create-absence.component.css']
})
export class CreateAbsenceComponent implements OnInit {

  absence = new AbsenceCreateDto();
  allEtudiant = new Array<EtudiantUpdateDto>();
  etudiant = new EtudiantUpdateDto();
  messageSucces= '';
  messageEchec='';
  formulaireAjout: FormGroup;
  id: number;
  emptyListeAllEtudiants: boolean;
  afficheListe: boolean;

  constructor(
    private serviceAbsences: AbsencesService,
    private serviceEtudiants: EtudiantsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getEtudiants();
    this.emptyListeAllEtudiants = true;
    this.formulaireAjout = new FormGroup({
      etudiant: new FormControl(this.absence.etudiant, Validators.required),
      dateStart: new FormControl(this.absence.dateStart, Validators.required),
      dateEnd: new FormControl(this.absence.dateEnd, Validators.required),
      justif: new FormControl(this.absence.justif, Validators.required),
      descript: new FormControl(this.absence.descript, Validators.required),
      
    })
  }

  getEtudiants() {
    this.serviceEtudiants.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allEtudiant = responseDto.body;
           if (this.allEtudiant.length == 0) {
             this.emptyListeAllEtudiants = true;
           } else {
             this.emptyListeAllEtudiants = false;
           }
        }
      }
    )
  }

  save() {
    this.serviceAbsences.create(this.absence).subscribe(
      (responseDto) => {
          if (!responseDto.error) {
            this.messageSucces = 'Création réussie';
          }
      },
      (responseDto) => {
          if (responseDto.error) {
              this.messageEchec = 'Erreur lors de la création';
          }
      }
    );
    
  }

  retour() {
    this.location.back();
  }
}
