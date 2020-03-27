import { Component, OnInit } from '@angular/core';
import { MatiereUpdateDto } from 'src/app/models/matiere-update-dto';
import { MatiereService } from 'src/app/services/matiere/matiere.service';
import { MatiereCreateDto } from 'src/app/models/matiere-create-dto';

@Component({
  selector: 'app-all-matiere',
  templateUrl: './all-matiere.component.html',
  styleUrls: ['./all-matiere.component.css']
})
export class AllMatiereComponent implements OnInit {

  allMatiere = new Array<MatiereUpdateDto>();
  matiere = new MatiereCreateDto();
  
  constructor(private service: MatiereService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(
      (responseDto) => {
        if(!responseDto.error){
          this.allMatiere = responseDto.body;
        }
      }
    );
  }

  delete(id: number) {
    this.service.delete(id).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.allMatiere = this.allMatiere.filter(
            element =>  element.idMatiere !== id
          );
        }
      }
    );
  }

  create(){
  
    this.service.create(this.matiere).subscribe(
      responseDto => {
      if (!responseDto.error) {
      document.location.reload();
      }
    }
      
    );
  }

}
