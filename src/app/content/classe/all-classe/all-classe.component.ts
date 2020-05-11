import { Component, OnInit } from '@angular/core';
import { ClasseUpdateDto } from 'src/app/models/classe-update-dto';
import { ClassesService } from 'src/app/services/classe/classes.service';

@Component({
  selector: 'app-all-classe',
  templateUrl: './all-classe.component.html',
  styleUrls: ['./all-classe.component.css']
})
export class AllClasseComponent implements OnInit {

  allClasse = new Array<ClasseUpdateDto>();
     
  constructor(
    private serviceClasses: ClassesService
    ) {}

  ngOnInit() {
      this.getAll();
      
  }

  getAll() {
    this.serviceClasses.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allClasse = responseDto.body;
        }
      }
    );
  }

  delete(id: number) {
    this.serviceClasses.delete(id).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.getAll();
        }
      }
    );
  }

  


}
