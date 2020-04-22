import { Component, OnInit } from '@angular/core';
import { AbsenceUpdateDto } from 'src/app/models/absence-update-dto';
import { ActivatedRoute } from '@angular/router';
import { AbsencesService } from 'src/app/services/absence/absences.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-absence',
  templateUrl: './detail-absence.component.html',
  styleUrls: ['./detail-absence.component.css']
})
export class DetailAbsenceComponent implements OnInit {

  absence = new AbsenceUpdateDto();

  constructor(
    private route: ActivatedRoute,
    private service: AbsencesService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getAbsence();
  }

  getAbsence(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getAbsence(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.absence = responseDto.body;
        }
      }
    );
  }

  retour() {
    this.location.back();
  }

}
