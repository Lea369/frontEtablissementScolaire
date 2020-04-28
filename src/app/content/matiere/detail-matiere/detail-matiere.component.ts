import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatieresService } from 'src/app/services/matiere/matieres.service';
import { MatiereUpdateDto } from 'src/app/models/matiere-update-dto';
import { Location } from '@angular/common';
import { EtudiantUpdateDto } from 'src/app/models/etudiant-update-dto';
import { ExamenUpdateDto } from 'src/app/models/examen-update-dto';

@Component({
  selector: 'app-detail-matiere',
  templateUrl: './detail-matiere.component.html',
  styleUrls: ['./detail-matiere.component.css']
})
export class DetailMatiereComponent implements OnInit {

  matiere = new MatiereUpdateDto();
  allEtudiant = new Array<EtudiantUpdateDto>();
  allExamens = new Array<ExamenUpdateDto>();
  emptyListe: boolean;
  messageExamens = '';
  tableauExamens: boolean;

  constructor(
    private route : ActivatedRoute,
    private serviceMatieres: MatieresService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getMatiere();
    this.emptyListe = false;
    this.tableauExamens = false;
  
  }

  retour(): void {
    this.location.back();
  }

  getMatiere(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.serviceMatieres.getMatiere(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.matiere = responseDto.body;
          if(this.matiere.listeEtudiant.length==0){
            this.emptyListe=true;
          }
          else {
            this.emptyListe=false;
          }
        }
      }
     );
  }

  afficherExamens(nom: string) {
    this.tableauExamens = true;
    this.getExamens(nom);
  }

  getExamens(nom: string) {
    this.serviceMatieres.getExamens(nom).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.allExamens = responseDto.body;
          this.messageExamens = 'Nombre d\'examens : ' +this.allExamens.length;
          
        }
      },
      (responseDto) => {
        if (responseDto.error) {
          this.allExamens = responseDto.body;
          this.messageExamens = 'Aucun examen n\'est enregistré pour cette matière.';
         
        }
      }
    )
  }

  

  

}
