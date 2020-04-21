import { Component, OnInit } from '@angular/core';
import { EtudiantUpdateDto } from 'src/app/models/etudiant-update-dto';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';
import { ResponseDto } from 'src/app/models/response-dto';
import { ClasseUpdateDto } from 'src/app/models/classe-update-dto';
import { EtudiantCreateDto } from 'src/app/models/etudiant-create-dto';
import { ClassesService } from 'src/app/services/classe/classes.service';


@Component({
  selector: 'app-all-etudiant',
  templateUrl: './all-etudiant.component.html',
  styleUrls: ['./all-etudiant.component.css']
})
export class AllEtudiantComponent implements OnInit {
  
  allEtudiant = new Array<EtudiantUpdateDto>();
  listeClasse = new Array<ClasseUpdateDto>();

  constructor(
    private serviceEtudiants: EtudiantsService, 
    ) { }

  ngOnInit() {
    this.getAll();
    
  }

  getAll() {
    this.serviceEtudiants.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allEtudiant = responseDto.body;
        }
      }
    );
  }

  delete(id: number) {
    this.serviceEtudiants.delete(id).subscribe(
      responseDto => {
        if (!responseDto.error) {
          this.allEtudiant = this.allEtudiant.filter(element =>  element.identifiant !== id);
          this.getAll();
        }
      }
    );
  }

  
}
