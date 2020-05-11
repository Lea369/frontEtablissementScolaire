import { Component, OnInit } from '@angular/core';
import { ExamenUpdateDto } from 'src/app/models/examen-update-dto';
import { ExamensService } from 'src/app/services/examen/examens.service';

@Component({
  selector: 'app-all-examen',
  templateUrl: './all-examen.component.html',
  styleUrls: ['./all-examen.component.css']
})
export class AllExamenComponent implements OnInit {

  allExamen = new Array<ExamenUpdateDto>();
 
  constructor(
    private serviceExamens: ExamensService
  ) { }

  ngOnInit(): void {
    this.getAllExamens();
  }

  getAllExamens() {
    this.serviceExamens.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allExamen = responseDto.body;
        }
      }
    );
  }

  delete(id: number) {
    this.serviceExamens.delete(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.getAllExamens();
        }
      }
    );
  }

 

}
