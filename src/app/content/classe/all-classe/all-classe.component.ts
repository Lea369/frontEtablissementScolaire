import { Component, OnInit } from '@angular/core';
import { ClasseUpdateDto } from 'src/app/models/classe-update-dto';
import { ClassesService } from 'src/app/services/classe/classes.service';
import { ClasseCreateDto } from 'src/app/models/classe-create-dto';

@Component({
  selector: 'app-all-classe',
  templateUrl: './all-classe.component.html',
  styleUrls: ['./all-classe.component.css']
})
export class AllClasseComponent implements OnInit {

  allClasse = new Array<ClasseUpdateDto>();
  classe = new ClasseCreateDto();
   
  
  constructor(private service: ClassesService) {}

  ngOnInit() {
      this.getAll();
      
  }

  

  getAll() {
    this.service.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allClasse = responseDto.body;
        }
      }
    );
  }

  delete(id: number) {
    this.service.delete(id).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.allClasse = this.allClasse.filter(element =>  element.id !== id);
          this.getAll();
        }
      }
    );
  }

  


}
