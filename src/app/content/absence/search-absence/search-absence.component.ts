import { Component, OnInit } from '@angular/core';
import { AbsenceUpdateDto } from 'src/app/models/absence-update-dto';
import { AbsencesService } from 'src/app/services/absence/absences.service';

@Component({
  selector: 'app-search-absence',
  templateUrl: './search-absence.component.html',
  styleUrls: ['./search-absence.component.css']
})
export class SearchAbsenceComponent implements OnInit {

  numero1: number;
  absence1 = new AbsenceUpdateDto();
  message1='';
  single1:boolean;
  numero2: number;
  allAbsence2 = new Array<AbsenceUpdateDto>();
  allAbsence22 = new Array<AbsenceUpdateDto>();
  message2 = '';
  single2: boolean;

  constructor(
    private serviceAbsences: AbsencesService
  ) { }

  ngOnInit(): void {
    this.single1 = false;
    this.single2 = false;
  }

  getSingle1(numero: number) {
    this.serviceAbsences.getAbsence(numero).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.message1 = '';
          this.single1 = true;
          this.absence1 = responseDto.body;
          this.message2 = '';
          this.single2 = false;
          this.allAbsence2 = [];
          this.allAbsence22 = [];
        }
      },
      (responseDto) => {
        if (responseDto.error) {
          this.message1 = 'Aucune absence n\'existe avec cet ID';
          this.single1 = false;
          this.absence1 = null;
          this.message2 = '';
          this.single2 = false;
          this.allAbsence2 = [];
          this.allAbsence22 = [];
        }
      }
    )
  }

  getSingle2(numero: number) {
    this.serviceAbsences.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allAbsence2 = responseDto.body;
          this.allAbsence22 = this.allAbsence2.filter(element => element.etudiant.identifiant == numero);
            if (this.allAbsence22.length == 0) {
              this.message2 = 'Aucune absence n\'existe avec cet étudiant';
              this.single2 = false;
              this.message1 = '';
              this.single1 = false;
              this.absence1 = null;
            } else {
              this.message2 = '';
              this.single2 = true;
              this.message1 = '';
              this.single1 = false;
              this.absence1 = null;
            }
        }
      }
    )
  }
  delete(numero: number) {
    this.serviceAbsences.delete(numero).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          if (this.single1) {
            this.getSingle1(this.numero1);
          }
          if (this.single2) {
            this.getSingle2(this.numero2);
          }
        }
      }
    )
  }

}
