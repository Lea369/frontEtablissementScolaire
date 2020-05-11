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
  messageSucces1='';
  messageEchec1 = '';
  single1:boolean;
  
  constructor(
    private serviceAbsences: AbsencesService  ) { }

  ngOnInit(): void {
    this.single1 = false;
  }

  getSingle1(numero: number) {
    this.serviceAbsences.getAbsence(numero).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.messageSucces1 = '1 absence(s) trouvée(s).';
          this.messageEchec1 = '';
          this.single1 = true;
          this.absence1 = responseDto.body;
         
        }
      },
      (responseDto) => {
        if (responseDto.error) {
          this.messageEchec1 = 'Aucune absence trouvée.';
          this.messageSucces1 = '';
          this.single1 = false;
          this.absence1 = null;
        
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
          
        }
      }
    )
  }

}
