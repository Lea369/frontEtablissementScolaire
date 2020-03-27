import { Component, OnInit } from '@angular/core';
import { AbsenceUpdateDto } from 'src/app/models/absence-update-dto';
import { AbsencesService } from 'src/app/services/absence/absences.service';

@Component({
  selector: 'app-all-absence',
  templateUrl: './all-absence.component.html',
  styleUrls: ['./all-absence.component.css']
})
export class AllAbsenceComponent implements OnInit {

  allAbsence= new Array<AbsenceUpdateDto>();

  constructor(private service: AbsencesService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(
      (responseDto) => {
        if(!responseDto.error){
          this.allAbsence = responseDto.body;
        }
      }
    );
  }

  delete(id: number) {
    this.service.delete(id).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.allAbsence = this.allAbsence.filter(
            element =>  element.identifiant !== id
          );
        }
      }
    );
  }

}
