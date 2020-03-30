import { Component, OnInit } from '@angular/core';
import { AbsenceUpdateDto } from 'src/app/models/absence-update-dto';
import { EtudiantUpdateDto } from 'src/app/models/etudiant-update-dto';
import { ActivatedRoute } from '@angular/router';
import { AbsencesService } from 'src/app/services/absence/absences.service';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';

@Component({
  selector: 'app-detail-absence',
  templateUrl: './detail-absence.component.html',
  styleUrls: ['./detail-absence.component.css']
})
export class DetailAbsenceComponent implements OnInit {

  absence: AbsenceUpdateDto;

  allEtudiant = new Array<EtudiantUpdateDto>();

  errMessage: string;
  editMode = false;

  toggle(): void {
    if (this.editMode) {
      window.location.reload()
    } else {
      this.getAllEtudiants();
      this.editMode = true;
    }
  }

  update(): void {
    this.service.updateAbsence(this.absence).subscribe(
      responseDto => {
        if (!responseDto.error) {
          window.location.reload();
        } else {
          console.log(responseDto);
        }
      },
      responseError => {
        console.log(responseError);
      }
    );
  }

  constructor(
    private route: ActivatedRoute,
    private service: AbsencesService,
    private etuService: EtudiantsService
  ) { }

  ngOnInit(): void {
    this.getAbsence();
  }

  getAbsence(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getAbsence(id).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.absence = responseDto.body;
        }
      },
      responseError => {
        console.log(responseError);
        this.errMessage = "Erreur " + responseError.status + ": ";

        if (responseError.status === 400) {
          this.errMessage += responseError.error.message;
        }
      }
    );
  }

  private getAllEtudiants(): void {
    this.etuService.getAll().subscribe(
      responseDto => this.allEtudiant = responseDto.body
    );
  }

}
