import { Component, OnInit } from '@angular/core';
import { MatieresService } from 'src/app/services/matiere/matieres.service';
import { MatiereUpdateDto } from 'src/app/models/matiere-update-dto';

@Component({
  selector: 'app-search-matiere',
  templateUrl: './search-matiere.component.html',
  styleUrls: ['./search-matiere.component.css']
})
export class SearchMatiereComponent implements OnInit {

  numero: number;
  messageSucces1 = '';
  messageEchec1 = '';
  single1: boolean;
  matiere1 = new MatiereUpdateDto;
  nom: string;
  messageSucces2 = '';
  messageEchec2 = '';
  single2: boolean;
  allMatiere2 = new Array<MatiereUpdateDto>();
  allMatiere22 = new Array<MatiereUpdateDto>();

  constructor(
    private serviceMatieres: MatieresService
  ) { }

  ngOnInit(): void {
    this.single1 = false;
    this.single2 = false;
  }

  getSingle1(numero: number) {
    this.serviceMatieres.getMatiere(numero).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
            this.single1 = true;
            this.matiere1 = responseDto.body;
            this.messageSucces1 = '1 matière(s) trouvée(s).';
            this.messageEchec1 = '';
            this.single2 = false;
            this.messageSucces2 = '';
            this.messageEchec2 = '';
            this.allMatiere22 = [];
            this.allMatiere2 = [];
        }
      },
      (responseDto) => {
        if (responseDto.error) {
          this.single1 = false;
          this.matiere1 = null;
          this.messageSucces1 = '';
          this.messageEchec1 = 'Aucune matière trouvée.';
          this.single2 = false;
          this.messageSucces2 = '';
          this.messageEchec2 = '';
          this.allMatiere22 = [];
          this.allMatiere2 = [];
        }
      }
    )
  }

  getSingle2(nom: string) {
    this.serviceMatieres.getAll().subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allMatiere2 = responseDto.body;
          this.allMatiere22 = this.allMatiere2.filter(element => element.nomMatiere == nom);
          if (this.allMatiere22.length == 0) {
            this.single2 = false;
            this.messageEchec2 = 'Aucune matière trouvée';
            this.messageSucces2 = '';
            this.single1 = false;
            this.messageSucces1 = '';
            this.messageEchec1 = '';
            this.matiere1 = null;
          } else {
            this.single2 = true;
            this.messageEchec2 = '';
            this.messageSucces2 = this.allMatiere22.length + ' matière(s) trouvée(s).';
            this.single1 = false;
            this.messageSucces1 = '';
            this.messageEchec1 = '';
            this.matiere1 = null;
          }
        }
      }
    )
  }

  delete(id: number) {
    this.serviceMatieres.delete(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          if (this.single1) {
            this.getSingle1(this.numero);
          }
          if (this.single2) {
            this.getSingle2(this.nom);
          }
        }
      }
    )
  }

}
