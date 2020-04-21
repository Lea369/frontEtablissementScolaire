import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classe/classes.service';
import { ClasseUpdateDto } from 'src/app/models/classe-update-dto';

@Component({
  selector: 'app-search-classe',
  templateUrl: './search-classe.component.html',
  styleUrls: ['./search-classe.component.css']
})
export class SearchClasseComponent implements OnInit {

  numero: number;
  nom: string;
  single1: boolean;
  single2: boolean;
  classe1: ClasseUpdateDto;
  allClasse = new Array<ClasseUpdateDto>();
  allClasse2 = new Array<ClasseUpdateDto>();
  message1 = '';
  message2 = '';

  constructor(
    private serviceClasses: ClassesService
  ) { }

  ngOnInit(): void {
    this.single1 = false;
    this.single2 = false;
  }

  getSingle1(numero: number) {
    this.serviceClasses.getClasse(numero).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.classe1 = responseDto.body;
          this.message1 = '';
          this.single1 = true;
          this.single2 = false;
          this.message2 = '';
        }
      },
      (responseDto) => {
        if (responseDto.error) {
          this.message1 = 'Aucune classe n\'existe avec cet ID';
          this.single1 = false;
          this.classe1 = null;
          this.single2 = false;
          this.message2 = '';
        }
      }
    )
  }

  getSingle2(nom: string) {
    this.serviceClasses.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allClasse = responseDto.body;
          this.allClasse2 = this.allClasse.filter(element =>  element.name == nom);
          if (this.allClasse2.length == 0) {
            this.message1 = '';
            this.single1 = false;
            this.message2 = 'Aucune classe n\'existe avec ce nom';
            this.single2 = false;
          }
          else {
            this.message1 = '';
            this.single1 = false;
            this.message2= '';
            this.single2 = true;
          }
        }
      }
    )
  }

  delete(id: number) {
    this.serviceClasses.delete(id).subscribe(
      responseDto => {
        if (!responseDto.error) {
          if (this.single1) {
            this.getSingle1(id);
          }
          if (this.single2) {
            this.getSingle2(this.nom);
          }
        }
      }
    );
  }
}
