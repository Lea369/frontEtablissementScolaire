import { Component, OnInit } from '@angular/core';
import { AbsenceUpdateDto } from 'src/app/models/absence-update-dto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EtudiantUpdateDto } from 'src/app/models/etudiant-update-dto';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';
import { AbsencesService } from 'src/app/services/absence/absences.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { ResponseDto } from 'src/app/models/response-dto';

@Component({
  selector: 'app-update-absence',
  templateUrl: './update-absence.component.html',
  styleUrls: ['./update-absence.component.css']
})
export class UpdateAbsenceComponent implements OnInit {

  absence = new AbsenceUpdateDto();
  etudiant = new EtudiantUpdateDto();
  formulaireModif: FormGroup;
  numero: number;
  allEtudiant = new Array<EtudiantUpdateDto>();
  messageSucces='';
  messageEchec='';

  constructor(
    private serviceEtudiants: EtudiantsService,
    private serviceAbsences: AbsencesService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAbsence();
    this.getAllEtudiant();
    this.formulaireModif = new FormGroup({
      dateStart: new FormControl(this.absence.dateStart, Validators.required),
      dateEnd: new FormControl(this.absence.dateEnd, Validators.required),
      justif: new FormControl(this.absence.justif, Validators.required),
      descript: new FormControl(this.absence.descript, Validators.required),
      numero: new FormControl(this.numero, Validators.required)
    })
  }

  getAbsence() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.serviceAbsences.getAbsence(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.absence = responseDto.body;
          console.log(this.absence);
        }
      }
    );
  }

  getAllEtudiant() {
    this.serviceEtudiants.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allEtudiant = responseDto.body;
        }
      }
    );
  }

  retour() {
    this.location.back();
  }

  update() {
    this.serviceEtudiants.getEtudiant(this.numero).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.etudiant = responseDto.body;
          this.absence.etudiant = this.etudiant;
          console.log(this.absence);
          this.serviceAbsences.updateAbsence(this.absence).subscribe(
            (responseDto) => {
              if (!responseDto.error) {
                this.messageSucces = 'Modification réussie';
                this.messageEchec = '';
              }
            },
            (responseDto) => {
              if (responseDto.error) {
                this.messageEchec = 'Erreur lors de la modification';
                this.messageSucces = '';
              }
            }
          )
        }
      },
      (responseDto) => {
        if (responseDto.error) {
          this.messageEchec = 'Erreur lors de la modification : cet étudiant n\'existe pas';
          this.messageSucces = '';
        }
      }
    )
  }
}
