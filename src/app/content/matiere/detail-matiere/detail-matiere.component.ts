import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatiereService } from 'src/app/services/matiere/matiere.service';
import { MatiereUpdateDto } from 'src/app/models/matiere-update-dto';
import { Location } from '@angular/common';
import { EtudiantUpdateDto } from 'src/app/models/etudiant-update-dto';
import { EtudiantsService } from 'src/app/services/etudiant/etudiants.service';
import { ResponseDto } from 'src/app/models/response-dto';
import { splitClasses } from '@angular/compiler';

@Component({
  selector: 'app-detail-matiere',
  templateUrl: './detail-matiere.component.html',
  styleUrls: ['./detail-matiere.component.css']
})
export class DetailMatiereComponent implements OnInit {

  @Input() matiere: MatiereUpdateDto;
  messageValidation: string;
  messageEchec: string;
  emptyListe: boolean = false;
  listeEtudiant = new Array<EtudiantUpdateDto>();
  listeNewEtudiant = new Array<EtudiantUpdateDto>();
  montrerAjout: boolean = false;
  modifNom: boolean = false;

  constructor(
    private route : ActivatedRoute,
    private service: MatiereService,
    private serviceEtudiant: EtudiantsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getMatiere();
  
  }
  goBack(): void {
    this.location.back();
  }

  toggle(): void {
    if(this.montrerAjout){
      window.location.reload()
    } else {
      this.getEtudiants();
      this.montrerAjout = true;
    }
  }

  toggleNom(): void {
    if(this.modifNom){
      this.update();
      window.location.reload();
    } else {
      this.modifNom = true;
    }
  }

  getMatiere(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getMatiere(id).subscribe(
      (responseDto) => {
        if (!responseDto.error) {
          this.matiere = responseDto.body;
          if(this.matiere.listeEtudiant.length==0){
            this.emptyListe=true;
          }
          else {

          }
        }
      }
     );

  }

  getEtudiants(): void{
    this.serviceEtudiant.getAll().subscribe(
      responseDto => {
        if(!responseDto.error){
          this.montrerAjout=true;
          this.listeEtudiant = responseDto.body;
          this.matiere.listeEtudiant.forEach(element => {
           this.listeEtudiant.forEach(e => {
             if(element.identifiant==e.identifiant){
               this.listeEtudiant.splice(this.listeEtudiant.indexOf(e), 1);
             }
           });
          });
        }
      }
    )
  }

  ajoutEtudiant():void{

    this.listeNewEtudiant.forEach(element => {
      this.matiere.listeEtudiant.push(element);
    });
    this.service.update(this.matiere).subscribe(
      responseDto => {
        if(!responseDto.error){
          this.messageValidation = "mise à jour réussie."
          document.location.reload();
        }
      },
        responseDtoError => {
          if(responseDtoError.error) {
            this.messageEchec = 'Erreur de la mise à jour';
            document.location.reload();
          }
        }
      
    );

  }

  desinscrit(etudiant: EtudiantUpdateDto): void {
    const index: number = this.matiere.listeEtudiant.indexOf(etudiant);
    if(index!=-1){
    this.matiere.listeEtudiant.splice(index, 1);
    }
    this.service.update(this.matiere).subscribe(
      responseDto => {
        if(!responseDto.error){
          this.messageValidation = "mise à jour réussie."
          document.location.reload();
        }
      },
        responseDtoError => {
          if(responseDtoError.error) {
            this.messageEchec = 'Erreur de la mise à jour';
            document.location.reload();
          }
        }
      
      );
  }

  update(): void {
    this.service.update(this.matiere).subscribe(
    responseDto => {
      if(!responseDto.error){
        this.messageValidation = "mise à jour réussie."
        document.location.reload();
      }
    },
      responseDtoError => {
        if(responseDtoError.error) {
          this.messageEchec = 'Erreur de la mise à jour';
          document.location.reload();
        }
      }
    
    );
  }
}
