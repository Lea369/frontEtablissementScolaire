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
  messageSucces1 = '';
  messageEchec1 = '';
  messageSucces2 = '';
  messageEchec2 = '';

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
          this.messageSucces1 = '1 classe(s) trouvée(s).';
          this.messageEchec1 = '';
          this.single1 = true;
          this.single2 = false;
          this.messageSucces2 = '';
          this.messageEchec2 = '';
        }
      },
      (responseDto) => {
        if (responseDto.error) {
          this.messageEchec1 = 'Aucune classe trouvée.';
          this.messageSucces1 = '';
          this.single1 = false;
          this.classe1 = null;
          this.single2 = false;
          this.messageSucces2 = '';
          this.messageEchec2 = '';
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
            this.messageSucces1 = '';
            this.messageEchec1 = '';
            this.single1 = false;
            this.messageSucces2 = '';
            this.messageEchec2 = 'Aucune classe trouvée.';
            this.single2 = false;
          }
          else {
            this.messageSucces1 = '';
            this.messageEchec1 = '';
            this.single1 = false;
            this.messageSucces2 = this.allClasse2.length + ' classe(s) trouvée(s).';
            this.messageEchec2 = '';
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
