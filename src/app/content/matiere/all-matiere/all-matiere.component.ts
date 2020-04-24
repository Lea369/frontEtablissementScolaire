import { Component, OnInit } from '@angular/core';
import { MatiereUpdateDto } from 'src/app/models/matiere-update-dto';
import { MatieresService } from 'src/app/services/matiere/matieres.service';

@Component({
  selector: 'app-all-matiere',
  templateUrl: './all-matiere.component.html',
  styleUrls: ['./all-matiere.component.css']
})
export class AllMatiereComponent implements OnInit {

  allMatiere = new Array<MatiereUpdateDto>();
 
  
  constructor(
    private service: MatieresService 
    ) { }

  
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
          this.getAll();
        }
      }
    );
  }

  
}
