import { Component, OnInit } from '@angular/core';
import { ExamenUpdateDto } from 'src/app/models/examen-update-dto';
import { ExamenService } from '../../../services/examen/examen.service';
import { ResponseDto } from 'src/app/models/response-dto';

@Component({
  selector: 'app-all-examen',
  templateUrl: './all-examen.component.html',
  styleUrls: ['./all-examen.component.css']
})
export class AllExamenComponent implements OnInit {

  allExamen = new Array<ExamenUpdateDto>();

  delete(id : number) {
    this.service.delete(id).subscribe(
      responseDto => {
        this.allExamen = this.allExamen.filter(
          exam => exam.idExam !== id
        )
      }
    );
  }

  constructor(private service: ExamenService) { }

  ngOnInit(): void {
    this.service.getAll().subscribe(
      responseDto => this.allExamen = responseDto.body
    );
  }

}
