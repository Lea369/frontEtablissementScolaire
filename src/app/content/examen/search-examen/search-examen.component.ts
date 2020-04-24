import { Component, OnInit } from '@angular/core';
import { ExamenUpdateDto } from 'src/app/models/examen-update-dto';
import { ExamensService } from 'src/app/services/examen/examens.service';
import { TypeEnum } from 'src/app/enums/type-enum.enum';

@Component({
  selector: 'app-search-examen',
  templateUrl: './search-examen.component.html',
  styleUrls: ['./search-examen.component.css']
})
export class SearchExamenComponent implements OnInit {

  numero: number;
  messageSucces1 = '';
  messageEchec1 = '';
  single1: boolean;
  examen1 = new ExamenUpdateDto;
  nom: string;
  messageSucces2 = '';
  messageEchec2 = '';
  single2: boolean;
  allExamen2 = new Array<ExamenUpdateDto>();
  allExamen22 = new Array<ExamenUpdateDto>();
  type: TypeEnum;
  messageSucces3 = '';
  messageEchec3 = '';
  single3: boolean;
  allExamen3 = new Array<ExamenUpdateDto>();
  allExamen33 = new Array<ExamenUpdateDto>();

  constructor(
    private serviceExamens: ExamensService
  ) { }

  ngOnInit(): void {
    this.single1 = false;
    this.single2 = false;
    this.single3 = false;
  }

  getSingle1(numero: number) {
    this.serviceExamens.getExamen(numero).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
            this.single1 = true;
            this.examen1 = responseDto.body;
            this.messageSucces1 = '1 examen(s) trouvé(s).';
            this.messageEchec1 = '';
            this.single2 = false;
            this.messageSucces2 = '';
            this.messageEchec2 = '';
            this.allExamen22 = [];
            this.allExamen2 = [];
            this.single3 = false;
            this.messageSucces3 = '';
            this.messageEchec3 = '';
            this.allExamen3 = [];
            this.allExamen33 = [];
        }
      },
      (responseDto) => {
        if (responseDto.error) {
          this.single1 = false;
          this.examen1 = null;
          this.messageSucces1 = '';
          this.messageEchec1 = 'Aucun examen trouvé.';
          this.single2 = false;
          this.messageSucces2 = '';
          this.messageEchec2 = '';
          this.allExamen22 = [];
          this.allExamen2 = [];
          this.single3 = false;
          this.messageSucces3 = '';
          this.messageEchec3 = '';
          this.allExamen3 = [];
          this.allExamen33 = [];
        }
      }
    )
  }

  getSingle2(nom: string) {
    this.serviceExamens.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allExamen2 = responseDto.body;
          this.allExamen22 = this.allExamen2.filter(element => element.matiereExamen.nomMatiere == nom);
          if (this.allExamen22.length == 0) {
            this.single2 = false;
            this.messageEchec2 = 'Aucun examen trouvé.';
            this.messageSucces2 = '';
            this.single3 = false;
            this.messageSucces3 = '';
            this.messageEchec3 = '';
            this.allExamen3 = [];
            this.allExamen33 = [];
            this.single1 = false;
            this.messageSucces1 = '';
            this.messageEchec1 = '';
            this.examen1 = null;
          } else {
            this.single2 = true;
            this.messageEchec2 = '';
            this.messageSucces2 = this.allExamen22.length + ' examen(s) trouvé(s).';
            this.single3 = false;
            this.messageSucces3 = '';
            this.messageEchec3 = '';
            this.allExamen3 = [];
            this.allExamen33 = [];
            this.single1 = false;
            this.messageSucces1 = '';
            this.messageEchec1 = '';
            this.examen1 = null;
          }
        }
      }
    )
  }

  getSingle3(type: TypeEnum) {
    this.serviceExamens.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allExamen3 = responseDto.body;
          this.allExamen33 = this.allExamen3.filter(element => element.typeExamen == type);
          if (this.allExamen33.length == 0) {
            this.single3 = false;
            this.messageEchec3 = 'Aucun examen trouvé.';
            this.messageSucces3 = '';
            this.single2 = false;
            this.messageSucces2 = '';
            this.messageEchec2 = '';
            this.allExamen2 = [];
            this.allExamen22 = [];
            this.single1 = false;
            this.messageSucces1 = '';
            this.messageEchec1 = '';
            this.examen1 = null;
          } else {
            this.single3 = true;
            this.messageEchec3 = '';
            this.messageSucces3 = this.allExamen33.length + ' examen(s) trouvé(s).';
            this.single2 = false;
            this.messageSucces2 = '';
            this.messageEchec2 = '';
            this.allExamen2 = [];
            this.allExamen22 = [];
            this.single1 = false;
            this.messageSucces1 = '';
            this.messageEchec1 = '';
            this.examen1 = null;
          }
        }
      }
    )
  }

  delete(id: number) {
    this.serviceExamens.delete(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          if (this.single1) {
            this.getSingle1(this.numero);
          }
          if (this.single2) {
            this.getSingle2(this.nom);
          }
          if (this.single3) {
            this.getSingle3(this.type);
          }
        }
      }
    )
  }

}

