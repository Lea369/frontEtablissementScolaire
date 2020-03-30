import { Component, OnInit, Input } from '@angular/core';
import { AbsenceUpdateDto } from 'src/app/models/absence-update-dto';
import { ActivatedRoute } from '@angular/router';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';
import { Location} from '@angular/common';

@Component({
  selector: 'app-absence-etudiant',
  templateUrl: './absence-etudiant.component.html',
  styleUrls: ['./absence-etudiant.component.css']
})
export class AbsenceEtudiantComponent implements OnInit {
  @Input() email: string;
  allAbs = new Array<AbsenceUpdateDto>();

  constructor(protected route: ActivatedRoute,
    protected service: EtudiantsService,
    protected location: Location) {
  }

  ngOnInit(): void {
    this.getAbs();
  }

  getAbs(): void {
    this.service.abs(this.email).subscribe(
      (responseDto) => {
        if(!responseDto.error && responseDto.body != null){
          this.allAbs = responseDto.body;
        }
      }
    );
  }

}
